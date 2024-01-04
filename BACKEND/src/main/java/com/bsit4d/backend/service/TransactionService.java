package com.bsit4d.backend.service;


import com.bsit4d.backend.model.*;
import com.bsit4d.backend.repository.TransactionRepository;
import com.bsit4d.backend.repository.TransactionVersionRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private TransactionVersionRepository transactionVersionRepository;
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


    public String updateTransaction(String transactionId, TransactionModel updatedTransaction) {
        try {
            TransactionModel existingTransaction = transactionRepository.findByTransactionId(transactionId);

            TransactionVersionModel auditLog = new TransactionVersionModel();
            auditLog.setTransaction(existingTransaction);
            auditLog.setAmount(existingTransaction.getAmount());
            auditLog.setQuantity(existingTransaction.getQuantity());
            auditLog.setTotal(existingTransaction.getTotal());
            auditLog.setRemark(existingTransaction.getRemark());
            auditLog.setOrNumber(existingTransaction.getOrNumber());
            auditLog.setVersion(existingTransaction.getVersion());
            auditLog.setTransactionDate(existingTransaction.getTransactionDate());
            auditLog.setChangeTime(LocalDate.now().atStartOfDay());

            existingTransaction.setAmount(updatedTransaction.getAmount());
            existingTransaction.setQuantity(updatedTransaction.getQuantity());
            existingTransaction.setTotal(updatedTransaction.getTotal());
            existingTransaction.setRemark(updatedTransaction.getRemark());
            existingTransaction.setOrNumber(updatedTransaction.getOrNumber());
            existingTransaction.setTransactionDate(updatedTransaction.getTransactionDate());
//            logger.info("Before: {}", existingTransaction.getVersion());
//            System.out.println("Before:"+existingTransaction.getVersion());
            transactionRepository.save(existingTransaction);

//            System.out.println("After:"+existingTransaction.getVersion());
            transactionVersionRepository.save(auditLog);

            return "Success";
        } catch (Exception e) {
            // Log the exception or handle it based on your application's needs
            return "Error: " + e.getMessage();
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
                List.of("DONATION", "COLLECTION", "IGP"));

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

    public List<TransactionModel> findAllTransactionsDateRange(LocalDate startDate, LocalDate endDate) {
        List<TransactionModel> transactionModels = transactionRepository
                .findAllByAllocationTypeInAndTransactionDateBetweenOrderByTransactionDate(
                        List.of("DONATION", "COLLECTION", "IGP"), startDate, endDate);

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


//    public String updateLogsTransaction(String transactionId) {
//        TransactionVersionModel existingTransaction = transactionVersionRepository.findByTransactionId(transactionId);
//        if (existingTransaction!=null){
//            return "Success";
//        }
//        else{
//            return "Error";
//        }
//    }

    public List<TransactionModel> getAllTransactionsWithVersions() {
        return transactionRepository.findAllWithTransactionVersion();
    }


    public byte[] generateExcel(List<TransactionModel> transactions) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Transactions");

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);

            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Transaction ID");
            headerRow.createCell(1).setCellValue("Transaction Date");
            headerRow.createCell(2).setCellValue("Type");
            headerRow.createCell(3).setCellValue("Amount");
            headerRow.createCell(4).setCellValue("Quantity");
            headerRow.createCell(5).setCellValue("Total");
            headerRow.createCell(6).setCellValue("Balance");
            headerRow.createCell(7).setCellValue("Particular");
            headerRow.createCell(8).setCellValue("OR Number");
            headerRow.createCell(9).setCellValue("Remark");


            for (int i = 0; i <= 9; i++) {
                headerRow.getCell(i).setCellStyle(headerStyle);
            }

            int rowNum = 1;
            for (TransactionModel transaction : transactions) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(transaction.getTransactionId());
                row.createCell(1).setCellValue(transaction.getTransactionDate().toString());
                row.createCell(2).setCellValue(transaction.getAllocationType());
                row.createCell(3).setCellValue(transaction.getAmount());
                row.createCell(4).setCellValue(transaction.getQuantity());
                row.createCell(5).setCellValue(transaction.getTotal());
                row.createCell(6).setCellValue(transaction.getBalance());
                row.createCell(7).setCellValue(transaction.getParticular());
                row.createCell(8).setCellValue(transaction.getOrNumber());
                row.createCell(9).setCellValue(transaction.getRemark());
            }

            // Auto-resize columns
            for (int i = 0; i <= 9; i++) {
                sheet.autoSizeColumn(i);
            }

            try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
                workbook.write(outputStream);
                return outputStream.toByteArray();
            }

        } catch (IOException e) {
            e.printStackTrace();
            throw e;
        }
    }


}
