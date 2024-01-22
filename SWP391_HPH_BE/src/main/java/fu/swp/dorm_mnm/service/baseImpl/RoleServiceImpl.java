package fu.swp.dorm_mnm.service.baseImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fu.swp.dorm_mnm.dto.base.RoleDto;
import fu.swp.dorm_mnm.model.Role;
import fu.swp.dorm_mnm.repository.base.RoleRepository;
import fu.swp.dorm_mnm.service.base.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

  

    @Override
    public List<Role> findAll() {

        return roleRepository.findAll();
    }

    @Override
    public List<RoleDto> findAllDto() {
        List<Role> roles = roleRepository.findAll();
        List<RoleDto> rdtos = new ArrayList<>();
        for (Role r : roles) {
            rdtos.add(new RoleDto(r));
        }
        return rdtos;
    }

    @Override
    public Role findByRoleName(String roleName) {
        return roleRepository.findByRoleName(roleName);
    }

}
