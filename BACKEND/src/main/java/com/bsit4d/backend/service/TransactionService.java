package com.bsit4d.bitsfms.service;

import com.bsit4d.bitsfms.model.TransactionModel;
import com.bsit4d.bitsfms.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserService userService;

    public String save(TransactionModel transactionModel) {
        // Set the associatedUser in the transactionModel
        UserDetails associatedUser = userService.getLoggedInUserDetails();
        transactionModel.setIdNumber(Long.parseLong(associatedUser.getUsername()));
        String allocationType = transactionModel.getAllocationType();
        String transactionType = transactionModel.getTransactionType();

        try {
            String resultMessage = "";

            if ("IGP".equalsIgnoreCase(allocationType)) {
                Float currentIgpBalance = transactionRepository.findLatestIgpBalance() != null ? transactionRepository.findLatestIgpBalance() : 0;
                Float transactionAmount = transactionModel.getAmount();

                if ("DEPOSIT".equalsIgnoreCase(transactionType)) {
                    // Add the amount to IgpBalance for DEPOSIT
                    transactionModel.setIgpBalance(currentIgpBalance + transactionAmount);
                    transactionRepository.save(transactionModel);
                    resultMessage = "Success";
                } else if ("WITHDRAW".equalsIgnoreCase(transactionType)) {
                    // Subtract the amount from IgpBalance for WITHDRAW
                    if (transactionAmount <= currentIgpBalance) {
                        transactionModel.setIgpBalance(currentIgpBalance - transactionAmount);
                        transactionRepository.save(transactionModel);
                        resultMessage = "Success";
                    } else {
                        // Handle invalid withdrawal amount
                        resultMessage = "Invalid withdrawal amount";
                    }
                }
            }

            // Check if allocationType is Coh and transactionType is DEPOSIT or WITHDRAW
            if ("COH".equalsIgnoreCase(allocationType)) {
                Float currentCohBalance = transactionRepository.findLatestCohBalance() != null ? transactionRepository.findLatestCohBalance() : 0;
                Float transactionAmount = transactionModel.getAmount();

                if ("DEPOSIT".equalsIgnoreCase(transactionType)) {
                    // Add the amount to CohBalance for DEPOSIT
                    transactionModel.setCohBalance(currentCohBalance + transactionAmount);
                    transactionRepository.save(transactionModel);
                    resultMessage = "Success";
                } else if ("WITHDRAW".equalsIgnoreCase(transactionType)) {
                    // Subtract the amount from CohBalance for WITHDRAW
                    if (transactionAmount <= currentCohBalance) {
                        transactionModel.setCohBalance(currentCohBalance - transactionAmount);
                        transactionRepository.save(transactionModel);
                        resultMessage = "Success";
                    } else {
                        // Handle invalid withdrawal amount
                        resultMessage = "Invalid withdrawal amount";
                    }
                }
            }
            if ("SM".equalsIgnoreCase(allocationType)) {
                Float currentSmBalance = transactionRepository.findLatestCohBalance() != null ? transactionRepository.findLatestSmBalance() : 0;
                Float transactionAmount = transactionModel.getAmount();

                if ("DEPOSIT".equalsIgnoreCase(transactionType)) {
                    // Add the amount to CohBalance for DEPOSIT
                    transactionModel.setSmBalance(currentSmBalance + transactionAmount);
                    transactionRepository.save(transactionModel);
                    resultMessage = "Success";
                } else if ("WITHDRAW".equalsIgnoreCase(transactionType)) {
                    // Subtract the amount from CohBalance for WITHDRAW
                    if (transactionAmount <= currentSmBalance) {
                        transactionModel.setCohBalance(currentSmBalance - transactionAmount);
                        transactionRepository.save(transactionModel);
                        resultMessage = "Success";
                    } else {
                        // Handle invalid withdrawal amount
                        resultMessage = "Invalid withdrawal amount";
                    }
                }

            }
            return resultMessage;

        } catch (Exception e) {
            return e.getMessage();
        }
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

    public List<TransactionModel> findAllCohTransactions() {
        try {
            return transactionRepository.findByAllocationType("COH");
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            e.printStackTrace();
            throw new RuntimeException("Error retrieving COH transactions", e);
        }
    }

    public List<TransactionModel> findAllSmTransactions() {
        try {
            return transactionRepository.findByAllocationType("SM");
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            e.printStackTrace();
            throw new RuntimeException("Error retrieving SM transactions", e);
        }
    }
    public List<TransactionModel> getAllTransactions() {
        return transactionRepository.findAll();
    }



}
