package fu.swp.dorm_mnm.service.baseImpl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import fu.swp.dorm_mnm.dto.base.NewsDto;
import fu.swp.dorm_mnm.model.Manager;
import fu.swp.dorm_mnm.model.News;
import fu.swp.dorm_mnm.repository.base.ManagerRepository;
import fu.swp.dorm_mnm.repository.base.NewsRepository;
import fu.swp.dorm_mnm.service.base.NewsService;
import fu.swp.dorm_mnm.util.FileUtil;

@Service
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Override
    public Optional<News> findById(Long id) {
        return newsRepository.findById(id);
    }

    @Override
    public News save(News news) {
        return newsRepository.save(news);
    }

    @Override
    public void remove(Long id) {
        newsRepository.deleteById(id);
    }

    @Override
    public Page<News> findAll(int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 8, Sort.by(Sort.Direction.DESC, "createdAt"));
        return newsRepository.findAll(pageable);
    }

    @Override
    public Page<News> findAllByTitle(String title, int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 8, Sort.by(Sort.Direction.DESC, "createdAt"));
        return newsRepository.findByTitleContaining(title, pageable);
    }

    @Override
    public String save(MultipartFile file, NewsDto newsDto) {

        try {

            LocalDateTime now = LocalDateTime.now();
            Timestamp sqlNow = Timestamp.valueOf(now);

            Optional<Manager> manager = managerRepository.findById(newsDto.getManagerId());
            News news = newsRepository.save(News.builder()
                    .fileName(file.getOriginalFilename())
                    .fileType(file.getContentType())
                    .category(newsDto.getCategory())
                    .title(newsDto.getTitle())
                    .content(newsDto.getContent())
                    .createdAt(sqlNow)
                    .updatedAt(sqlNow)
                    .manager(manager.get())
                    .fileData(FileUtil.compressImage(file.getBytes())).build());
            if (news != null) {
                return "file uploaded successfully : " + file.getOriginalFilename();
            }
            return null;
        } catch (Exception e) {
            return "error: " + e;
        }
    }

    @Override
    public byte[] downloadFile(Long newsId) {
        Optional<News> news = newsRepository.findById(newsId);
        byte[] fileData = news.get().getFileData();
        return fileData;
    }

    @Override
    public void createNews(String filename, byte[] data, Long managerId, String category, String content, String title) {
        News news = new News();
        news.setFileName(filename);
        news.setFileData(data);
        news.setCategory(category);
        news.setContent(content);
        news.setTitle(title);

        news.setCreatedAt(new Date());
        news.setUpdatedAt(new Date());

        Manager manager = new Manager();
        manager.setManagerId(managerId);

        news.setManager(manager);
        newsRepository.save(news);
    }

}
