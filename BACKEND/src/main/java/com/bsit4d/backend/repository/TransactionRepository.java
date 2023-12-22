//package com.bsit4d.backend.repository;
//
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Repository
//public interface TransactionRepository extends JpaRepository<TransactionModel, Long> {
//    TransactionModel findByTransactionId(String transactionId);
//
//
//    //For checking current balance
//    @Query(value = "SELECT igp_balance FROM transaction WHERE allocation_type = 'IGP' ORDER BY id DESC LIMIT 1", nativeQuery = true)
//    Float findLatestIgpBalance();
//
//    @Query(value = "SELECT coh_balance FROM transaction WHERE allocation_type = 'COH' ORDER BY id DESC LIMIT 1", nativeQuery = true)
//    Float findLatestCohBalance();
//
//    @Query(value = "SELECT sm_balance FROM transaction WHERE allocation_type = 'SM' ORDER BY id DESC LIMIT 1", nativeQuery = true)
//    Float findLatestSmBalance();
//
//
//    //for displaying all transaction
//    List<TransactionModel> findByAllocationType(String allocationType);
//
//}
