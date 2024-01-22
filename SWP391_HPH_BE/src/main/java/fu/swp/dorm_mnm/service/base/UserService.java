package fu.swp.dorm_mnm.service.base;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.UserDto;
import fu.swp.dorm_mnm.model.User;

public interface UserService {

    public List<UserDto> getUserByRoleId(Long roleId);

    public Optional<User> findById(Long id);

    public User save(User news);

    public void remove(Long id);

    public Page<User> findAll(int pageNo);

    public UserDto createUser(UserDto userDto);

    public PageDto<UserDto> getAllUser(Long roleId, String partialName, String status, Pageable pageable);

    public UserDto save(MultipartFile userImage, UserDto userDto);
    public UserDto update(MultipartFile userImage,UserDto userDto);
    public byte[] getUserImage(Long userId);
}
