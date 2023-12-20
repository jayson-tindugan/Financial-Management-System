package com.bsit4d.bitsfms.repository;

import com.bsit4d.bitsfms.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel,Long> {
    @Query(value= "select * from users where id_number = ?1", nativeQuery = true)
    Optional<UserModel> findByIdNumber(Long idNumber);



    List<UserModel> findByRole(String role);

    boolean existsByIdNumber(Long idNumber);
}