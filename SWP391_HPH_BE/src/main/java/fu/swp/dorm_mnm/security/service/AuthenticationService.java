package fu.swp.dorm_mnm.security.service;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import fu.swp.dorm_mnm.dto.ChangePasswordDto;
import fu.swp.dorm_mnm.dto.ForgetPasswordDto;
import fu.swp.dorm_mnm.dto.base.UserDto;
import fu.swp.dorm_mnm.model.Role;
import fu.swp.dorm_mnm.model.User;
import fu.swp.dorm_mnm.repository.base.UserRepository;
import fu.swp.dorm_mnm.security.auth.AuthenticationRequest;
import fu.swp.dorm_mnm.security.auth.AuthenticationResponse;
import fu.swp.dorm_mnm.security.auth.RegisterRequest;
import fu.swp.dorm_mnm.security.token.Token;
import fu.swp.dorm_mnm.security.token.TokenRepository;
import fu.swp.dorm_mnm.security.token.TokenType;
import fu.swp.dorm_mnm.service.base.RoleService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private final UserRepository repository;

    @Autowired
    private final TokenRepository tokenRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final JwtService jwtService;

    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    private RoleService roleService;

    private final JavaMailSender emailSender;
    @Value("${mail.username}")
    private String supportEmail;
    private static final String UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER_CASE = UPPER_CASE.toLowerCase();
    private static final String NUMBERS = "0123456789";
    private static final String SPECIAL_CHARS = "!@#$%^&*()_+";
    private static final int PASSWORD_LENGTH = 16;
    private final SecureRandom random = new SecureRandom();

    public AuthenticationResponse register(RegisterRequest request) {
        Role role = roleService.findByRoleName(request.getRole());
        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .status("active")
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();
        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));
        var user = repository.findByUsername(request.getUsername())
                .orElseThrow();

        if (!user.getStatus().equalsIgnoreCase("active"))
            return null;

        var userdto = new UserDto(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userdto(userdto)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        try {
            Iterable<Token> token1 = tokenRepository.findAllByUser(user);
            tokenRepository.deleteAll(token1);
        } catch (Exception e) {

        }
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.repository.findByUsername(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    public boolean changePassword(ChangePasswordDto changePasswordDto) {
        var user = repository.findById(changePasswordDto.getUserid()).orElseThrow();
        if (passwordEncoder.matches(changePasswordDto.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
            repository.save(user);
            return true;
        }
        return false;
    }

    public boolean forgetPassword(ForgetPasswordDto forgetPasswordDto) {
        var user = repository.findByUsername(forgetPasswordDto.getUsername());
        if (user.get().getEmail().equals(forgetPasswordDto.getEmail())) {
            String password = generate();
            user.get().setPassword(passwordEncoder.encode(password));
            repository.save(user.get());
            String subject = "Your Password Reset Request has been Processed";
            String messageText = String.format(
                    "Dear %s,\n\n" +
                            "We've received your request to reset your password, and it has been processed successfully. Your security is important to us, and we've generated a new temporary password for you to use to access your account.\n\n"
                            +
                            "Your new temporary password is: %s\n\n" +
                            "For your security, please log in using this temporary password and change it to a new password of your choice immediately.\n\n"
                            +
                            "If you did not request a password reset, or if you have any concerns about your account security, please contact us immediately at 10diemswp391@gmail.com.\n\n"
                            +
                            "Here's a quick guide on how to change your password:\n" +
                            "1. Log in to your account using the temporary password provided above.\n" +
                            "2. Navigate to your account settings.\n" +
                            "3. Select \"Change Password\" or the equivalent option.\n" +
                            "4. Follow the prompts to enter and confirm your new password.\n\n" +
                            "Thank you for taking the steps to maintain the security of your account.\n\n" +
                            "Warm regards,\n\n" +
                            "10diemswp391\n" +
                            "Customer Support Team",
                    forgetPasswordDto.getUsername(), password);
            sendSimpleMessage(forgetPasswordDto.getEmail(), subject, messageText);
            return true;
        }
        return false;
    }

    public void sendSimpleMessage(
            String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(supportEmail);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public String generate() {
        // Using StringBuilder for efficient string concatenation
        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);

        // List of all character classes; will ensure at least one character from each
        // class is used
        List<String> charCategories = new ArrayList<>(List.of(UPPER_CASE, LOWER_CASE, NUMBERS, SPECIAL_CHARS));

        // Add one character from each class to satisfy the minimum requirement
        charCategories.forEach(category -> password.append(category.charAt(random.nextInt(category.length()))));

        // Fill the remaining spots with random characters from all classes
        String allChars = UPPER_CASE + LOWER_CASE + NUMBERS + SPECIAL_CHARS;
        for (int i = password.length(); i < PASSWORD_LENGTH; i++) {
            password.append(allChars.charAt(random.nextInt(allChars.length())));
        }

        // Shuffle the characters to avoid predictable patterns (upper case, lower case,
        // number, special)
        List<Character> pwdChars = new ArrayList<>();
        for (char c : password.toString().toCharArray()) {
            pwdChars.add(c);
        }
        Collections.shuffle(pwdChars);

        // Convert the list back to a string
        StringBuilder finalPassword = new StringBuilder();
        pwdChars.forEach(finalPassword::append);

        return finalPassword.toString();
    }

}