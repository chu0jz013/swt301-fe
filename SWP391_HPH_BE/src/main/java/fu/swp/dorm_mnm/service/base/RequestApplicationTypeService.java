package fu.swp.dorm_mnm.service.base;

import fu.swp.dorm_mnm.model.RequestApplicationType;

import java.util.Optional;

public interface RequestApplicationTypeService {

    public Iterable<RequestApplicationType> findAll();

    public Optional<RequestApplicationType> findById(Long id);

    public RequestApplicationType save(RequestApplicationType requestApplicationType);

    public void remove(Long id);
}
