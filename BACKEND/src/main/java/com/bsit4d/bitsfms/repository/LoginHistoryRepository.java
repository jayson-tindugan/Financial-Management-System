package com.bsit4d.bitsfms.repository;

import com.bsit4d.bitsfms.model.LoginHistoryModel;
import com.bsit4d.bitsfms.model.TransactionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginHistoryRepository extends JpaRepository<LoginHistoryModel, Long>{
    List<LoginHistoryModel> findByIdNumber(Long idNumber);
//    @Query(value = "INSERT into  igp_balance FROM transaction WHERE allocation_type = 'IGP' ORDER BY id DESC LIMIT 1", nativeQuery = true)
//    Float findLatestIgpBalance();

}
