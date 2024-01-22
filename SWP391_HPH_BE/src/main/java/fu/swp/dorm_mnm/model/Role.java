package fu.swp.dorm_mnm.model;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Entity
@Getter
@Setter
@AllArgsConstructor
@Table(name = "`role`")
public class Role {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "role_id")
        private Long id;

        @Column(name = "role_name")
        private String name;

        @JsonIgnore
        @ManyToMany(fetch = FetchType.EAGER)
        @JoinTable(name = "role_feature", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "feature_id"))
        private List<Feature> features;

        @Temporal(TemporalType.TIMESTAMP)
        @Column(name = "created_at")
        private Date createdAt;

        @Temporal(TemporalType.TIMESTAMP)
        @Column(name = "updated_at")
        private Date updatedAt;

        @Column(name = "description", length = 200)
        private String description;

        public List<SimpleGrantedAuthority> getAuthorities() {
                var authorities = getFeatures()
                                .stream()
                                .map(feature -> new SimpleGrantedAuthority(feature.getFeatureName()))
                                .collect(Collectors.toList());
                // List<SimpleGrantedAuthority> authorities = new ArrayList<>();
                authorities.add(new SimpleGrantedAuthority("ROLE_" + name));
                // authorities.add(new SimpleGrantedAuthority("admin:read"));
                // authorities.add(new SimpleGrantedAuthority("admin:create"));
                return authorities;
        }
}
