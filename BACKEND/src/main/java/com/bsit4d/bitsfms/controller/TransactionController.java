package com.bsit4d.bitsfms.controller;

import com.bsit4d.bitsfms.model.TransactionModel;
import com.bsit4d.bitsfms.model.UserModel;
import com.bsit4d.bitsfms.service.ExcelTransactionService;
import com.bsit4d.bitsfms.service.TransactionService;
//import com.bsit4d.bitsfms.service.UserService;
import com.bsit4d.bitsfms.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private ExcelTransactionService excelTransactionService;
    @Autowired
    private UserService userService;
    @PostMapping(value = "/save-transaction", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @PreAuthorize("hasAuthority ('TREASURER')")
    public ResponseEntity save( TransactionModel transactionModel){
        return new ResponseEntity<>(transactionService.save(transactionModel), HttpStatus.OK);
    }
    @GetMapping("/income-group-profit-list")
    public ResponseEntity<List<TransactionModel>> getAllIgpTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllIgpTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/cash-on-hand-list")
    public ResponseEntity<List<TransactionModel>> getAllCohTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllCohTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/student-money-list")
    public ResponseEntity<List<TransactionModel>> getAllSmTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllSmTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/export-to-excel")
    public ResponseEntity<Resource> exportTransactionsToExcel() {
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
        String currentDateTime = dateFormatter.format(new Date());

        try {
            List<TransactionModel> transactions = transactionService.getAllTransactions();
            byte[] excelBytes = excelTransactionService.generateExcel(transactions);

            ByteArrayResource resource = new ByteArrayResource(excelBytes);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=transactions_" + currentDateTime+ ".xlsx");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(excelBytes.length)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
