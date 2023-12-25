package com.bsit4d.backend.service;


import com.bsit4d.backend.model.*;
import com.bsit4d.backend.repository.TransactionRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private UserService userService;

    public String save(TransactionModel transactionModel) {

        try {
            // Set the associatedUser in the transactionModel
            UserDetails associatedUser = userService.getLoggedInUserDetails();
            transactionModel.setIdNumber(Double.parseDouble(associatedUser.getUsername()));
            transactionRepository.save(transactionModel);
            return "Success";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public List<TotalCashflowModel> findTotalCashflow() {
        return transactionRepository.findTotalCashflow();
    }


    public List<MonthlyCashflowModel> getMonthlyCollection() {
        List<MonthlyCashflowModel> transactionModels = transactionRepository.getMonthlyCollection();
        double balance = 0.0;

        for (MonthlyCashflowModel transactionModel : transactionModels) {
            Double cashInflows = 0.0;
            Double cashOutflows = 0.0;
                cashInflows = transactionModel.getCashOnHands();
                balance += cashInflows - cashOutflows;
            transactionModel.setCashOnHands(balance);
        }

        return transactionModels;
    }
    public List<MonthlyCashflowModel> getMonthlyDonation() {
        List<MonthlyCashflowModel> transactionModels = transactionRepository.getMonthlyDonation();
        double balance = 0.0;

        for (MonthlyCashflowModel transactionModel : transactionModels) {
            Double cashInflows = 0.0;
            Double cashOutflows = 0.0;
            cashInflows = transactionModel.getCashOnHands();
            balance += cashInflows - cashOutflows;
            transactionModel.setCashOnHands(balance);
        }

        return transactionModels;
    }

    public List<MonthlyCashflowModel> getMonthlyIgp() {
        List<MonthlyCashflowModel> transactionModels = transactionRepository.getMonthlyIgp();
        double balance = 0.0;

        for (MonthlyCashflowModel transactionModel : transactionModels) {
            Double cashInflows = 0.0;
            Double cashOutflows = 0.0;
            cashInflows = transactionModel.getCashOnHands();
            balance += cashInflows - cashOutflows;
            transactionModel.setCashOnHands(balance);
        }
       
        return transactionModels;
    }

    //
//    public List<MonthlyDonationModel> findMonthlyDonation() {
//        return transactionRepository.findMonthlyDonation();
//    }
//    public List<MonthlyIgpModel> findMonthlyIgp() {
//        return transactionRepository.findMonthlyIgp();
//    }
public List<TransactionModel> findAllTransactionsWithBalance() {
    List<TransactionModel> transactionModels = transactionRepository.findAllByAllocationTypeInOrderByTransactionDateDesc(
            List.of( "DONATION","COLLECTION", "IGP"));

    double balanceCollection = 0.0;
    double balanceDonation = 0.0;
    double balanceIGP = 0.0;

    for (TransactionModel transactionModel : transactionModels) {
        Double cashInflows = 0.0;
        Double cashOutflows = 0.0;

        if ("INFLOW".equals(transactionModel.getTransactionType())) {
            cashInflows = transactionModel.getTotal();
        } else if ("OUTFLOW".equals(transactionModel.getTransactionType())) {
            cashOutflows = transactionModel.getTotal();
        }

        if ("COLLECTION".equals(transactionModel.getAllocationType())) {
            balanceCollection += cashInflows - cashOutflows;
        } else if ("DONATION".equals(transactionModel.getAllocationType())) {
            balanceDonation += cashInflows - cashOutflows;
        } else if ("IGP".equals(transactionModel.getAllocationType())) {
            balanceIGP += cashInflows - cashOutflows;
        }

        transactionModel.setBalance(balanceCollection, balanceDonation, balanceIGP);
    }
    Collections.reverse(transactionModels);
    return transactionModels;
}





    public List<TransactionModel> findAllIgpTransactions() {
        try {
            return transactionRepository.findByAllocationType("IGP");
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            e.printStackTrace();
            throw new RuntimeException("Error retrieving IGP transactions", e);
        }
    }

    public List<TransactionModel> findAllCollectionTransactions() {
        try {
            return transactionRepository.findByAllocationType("COLLECTION");
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            e.printStackTrace();
            throw new RuntimeException("Error retrieving Collection transactions", e);
        }
    }

    public List<TransactionModel> findAllDonationTransactions() {
        try {
            return transactionRepository.findByAllocationType("DONATION");
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            e.printStackTrace();
            throw new RuntimeException("Error retrieving Donation transactions", e);
        }
    }


    public List<TransactionModel> getAllTransactions() {
        return transactionRepository.findAll();
    }



}
