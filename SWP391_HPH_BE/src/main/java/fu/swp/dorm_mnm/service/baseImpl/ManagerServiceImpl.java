package fu.swp.dorm_mnm.service.baseImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fu.swp.dorm_mnm.dto.PageDto;
import fu.swp.dorm_mnm.dto.base.ManagerDto;
import fu.swp.dorm_mnm.model.Manager;
import fu.swp.dorm_mnm.repository.base.ManagerRepository;
import fu.swp.dorm_mnm.service.base.ManagerService;

@Service
public class ManagerServiceImpl implements ManagerService {
    @Autowired
    private ManagerRepository managerRepository;
    @Override
    public PageDto<ManagerDto> findAll(Pageable pageable) {
        Page<Manager> page=managerRepository.findAll(pageable);
        List<ManagerDto> managerDtoList=new ArrayList<>();
        for (Manager manager:page.getContent()){
            managerDtoList.add(new ManagerDto(manager));
        }
        PageDto<ManagerDto> pageDto=new PageDto<>();
        pageDto.setData(managerDtoList);
        pageDto.setTotalPages(page.getTotalPages());
        pageDto.setTotalItems(page.getTotalElements());
        pageDto.setCurrentPage(page.getNumber());
        return pageDto;
    }

}
