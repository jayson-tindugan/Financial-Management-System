package com.bsit4d.bitsfms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"idNumber"})
})
public class UserModel{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long userId;
        private String firstName;
        private String middleName;
        private String lastName;
        private Long idNumber;

        @Column(name = "dateAdded", nullable = false, updatable = false)
        @CreationTimestamp
        @Temporal(TemporalType.TIMESTAMP)
        private LocalDateTime dateAdded;

        private String status;
        private String role;
        private String password;
}