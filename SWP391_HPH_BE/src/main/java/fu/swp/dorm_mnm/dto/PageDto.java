package fu.swp.dorm_mnm.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PageDto<T> {
    
    private int currentPage;
    private Long totalItems;
    private int totalPages;
    private List<T> data;
}
