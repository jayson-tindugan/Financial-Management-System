package com.bsit4d.backend.controller;

import com.bsit4d.backend.model.*;
//import com.bsit4d.backend.service.ExcelTransactionService;
import com.bsit4d.backend.service.TransactionService;
import com.bsit4d.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = { "http://localhost:5173" },
        exposedHeaders = {"Access-Control-Allow-Origin: http://localhost:5173","Access-Control-Allow-Credentials","Access-Control-Allow-Method","Access-Control-Allow-Headers"},
        allowedHeaders ={ "*","Access-Control-Allow-Credentials:true"}, allowCredentials = "true")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
//    @Autowired
//    private ExcelTransactionService excelTransactionService;
    @Autowired
    private UserService userService;

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @PreAuthorize("hasAuthority ('TREASURER')")
    public ResponseEntity save( TransactionModel transactionModel){
        return new ResponseEntity<>(transactionService.save(transactionModel), HttpStatus.OK);
    }
    @GetMapping("/igpList")
    public ResponseEntity<List<TransactionModel>> getAllIgpTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllIgpTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/collectionList")
    public ResponseEntity<List<TransactionModel>> getAllCollectionTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllCollectionTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/donationList")
    public ResponseEntity<List<TransactionModel>> getAllDonationTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllDonationTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/totalCashflow")
    public List<TotalCashflowModel> getTotalChart() {
        return transactionService.findTotalCashflow();
    }
    @GetMapping("/monthlyCollection")
    public ResponseEntity<List<MonthlyCashflowModel>> getMonthlyCollection() {
        return ResponseEntity.ok(transactionService.getMonthlyCollection());
    }
    @GetMapping("/monthlyDonation")
    public ResponseEntity<List<MonthlyCashflowModel>> getMonthlyDonation() {
        return ResponseEntity.ok(transactionService.getMonthlyDonation());
    }
    @GetMapping("/monthlyIgp")
    public ResponseEntity<List<MonthlyCashflowModel>> getMonthlyIgp() {
        return ResponseEntity.ok(transactionService.getMonthlyIgp());
    }

//    @GetMapping("/monthlyDonation")
//    public List<MonthlyDonationModel> getMonthlyDonation() {
//        return transactionService.findMonthlyDonation();
//    }
//    @GetMapping("/monthlyIgp")
//    public List<MonthlyIgpModel> getMonthlyIgp() {
//        return transactionService.findMonthlyIgp();
//    }
    @GetMapping("/fetchAll")
    public List<TransactionModel> getAllTransaction() {
        return transactionService.findAllTransactionsWithBalance();
    }
//    @GetMapping("/exportExcel")
//    public ResponseEntity<Resource> exportTransactionsToExcel() {
//        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
//        String currentDateTime = dateFormatter.format(new Date());
//
//        try {
//            List<TransactionModel> transactions = transactionService.getAllTransactions();
//            byte[] excelBytes = excelTransactionService.generateExcel(transactions);
//
//            ByteArrayResource resource = new ByteArrayResource(excelBytes);
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=BITS-FINANCIAL-REPORT_" + currentDateTime+ ".xlsx");
//
//            return ResponseEntity.ok()
//                    .headers(headers)
//                    .contentLength(excelBytes.length)
//                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                    .body(resource);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.badRequest().build();
//        }
//    }

}
