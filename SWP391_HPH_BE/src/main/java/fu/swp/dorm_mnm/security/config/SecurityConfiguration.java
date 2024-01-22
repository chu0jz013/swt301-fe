package fu.swp.dorm_mnm.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

// import static fu.swp.dorm_mnm.model.Permission.ADMIN_CREATE;
// import static fu.swp.dorm_mnm.model.Permission.ADMIN_DELETE;
// import static fu.swp.dorm_mnm.model.Permission.ADMIN_READ;
// import static fu.swp.dorm_mnm.model.Permission.ADMIN_UPDATE;
// import static fu.swp.dorm_mnm.model.Permission.MANAGER_CREATE;
// import static fu.swp.dorm_mnm.model.Permission.MANAGER_DELETE;
// import static fu.swp.dorm_mnm.model.Permission.MANAGER_READ;
// import static fu.swp.dorm_mnm.model.Permission.MANAGER_UPDATE;
// import static fu.swp.dorm_mnm.user.Role.ADMIN;
// import static fu.swp.dorm_mnm.user.Role.MANAGER;
// import static org.springframework.http.HttpMethod.DELETE;
// import static org.springframework.http.HttpMethod.GET;
// import static org.springframework.http.HttpMethod.POST;
// import static org.springframework.http.HttpMethod.PUT;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .cors().and()
                .authorizeHttpRequests()
                .requestMatchers(
                        "/health-check",
                        "/vpnpay/**",
                        "/auth/**",
                        "/admin/user/userdetails",
                        "/v2/api-docs",
                        "/v3/api-docs",
                        "/v3/api-docs/**",
                        "/swagger-resources",
                        "/swagger-resources/**",
                        "/configuration/ui",
                        "/configuration/security",
                        "/swagger-ui/**",
                        "/webjars/**",
                        "/swagger-ui.html")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutUrl("/auth/logout")
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext());

        return http.build();
    }
}
