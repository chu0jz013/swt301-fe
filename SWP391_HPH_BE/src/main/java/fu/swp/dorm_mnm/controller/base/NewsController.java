package fu.swp.dorm_mnm.controller.base;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fu.swp.dorm_mnm.dto.base.NewsDto;
import fu.swp.dorm_mnm.model.News;
import fu.swp.dorm_mnm.service.base.NewsService;

@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    @PreAuthorize("hasAuthority('news:read')")
    public ResponseEntity<Map<String, Object>> getNewsPage(@RequestParam(required = false) String title,
            @RequestParam(value = "page", defaultValue = "0") int pageNo) {
        List<NewsDto> newsDtos = new ArrayList<>();
        try {

            Page<News> page;
            if (title == null) {
                page = newsService.findAll(pageNo);
            } else {
                page = newsService.findAllByTitle(title, pageNo);
            }

            for (News news : page.getContent()) {
                newsDtos.add(new NewsDto(news));
            }
            Map<String, Object> response = new HashMap<>();
            // response.put("content", page.getContent());
            response.put("content", newsDtos);
            response.put("currentPage", page.getNumber());
            response.put("totalItems", page.getTotalElements());
            response.put("totalPages", page.getTotalPages());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/detail/{id}")
    @PreAuthorize("hasAuthority('news:read')")
    public ResponseEntity<News> getNewsById(@PathVariable(required = true) Long id) {
        Optional<News> newsOptional = newsService.findById(id);
        return newsOptional.map(newsRequest -> new ResponseEntity<>(newsRequest, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("managerId") Long manager,
            @RequestParam("category") String category,
            @RequestParam("content") String content,
            @RequestParam("title") String title) throws IOException {
        String filename = file.getOriginalFilename();
        byte[] fileData = file.getBytes();

        newsService.createNews(filename, fileData, manager, category, content, title);
        return ResponseEntity.status(HttpStatus.OK)
                .body("PDF File uploaded done.\nAdd a News successfully");
    }

    @GetMapping("/file/{newsId}")
    public ResponseEntity<?> downloadFile(@PathVariable Long newsId) {
        byte[] resp = newsService.downloadFile(newsId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resp);
    }

    @DeleteMapping("/{newsId}")
    public ResponseEntity<String> deleteFile(@PathVariable Long newsId) {
        newsService.remove(newsId);
        return ResponseEntity.ok("Delete successfully!");
    }

}
