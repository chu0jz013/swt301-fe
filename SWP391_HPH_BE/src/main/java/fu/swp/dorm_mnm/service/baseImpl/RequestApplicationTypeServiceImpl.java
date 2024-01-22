package fu.swp.dorm_mnm.service.baseImpl;

import fu.swp.dorm_mnm.model.RequestApplicationType;
import fu.swp.dorm_mnm.repository.base.RequestApplicationTypeRepository;
import fu.swp.dorm_mnm.service.base.RequestApplicationTypeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RequestApplicationTypeServiceImpl implements RequestApplicationTypeService {

    @Autowired
    private RequestApplicationTypeRepository requestApplicationTypeRepository;

    @Override
    public Iterable<RequestApplicationType> findAll() {
        return requestApplicationTypeRepository.findAll();
    }

    @Override
    public Optional<RequestApplicationType> findById(Long id) {
        return requestApplicationTypeRepository.findById(id);
    }

    @Override
    public RequestApplicationType save(RequestApplicationType requestApplicationType) {
        return requestApplicationTypeRepository.save(requestApplicationType);
    }

    @Override
    public void remove(Long id) {
        requestApplicationTypeRepository.deleteById(id);
    }
}
