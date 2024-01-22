package fu.swp.dorm_mnm.service.base;

import java.util.Optional;

import fu.swp.dorm_mnm.model.FAQ;

public interface FaqService {

    public Iterable<FAQ> findAll();

    public Optional<FAQ> findById(Long id);

    public FAQ save(FAQ faq);

    public void remove(Long id);
}
