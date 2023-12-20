package com.bsit4d.bitsfms.controller;

import com.bsit4d.bitsfms.model.TransactionModel;
import com.bsit4d.bitsfms.model.UserModel;
import com.bsit4d.bitsfms.service.TransactionService;
//import com.bsit4d.bitsfms.service.UserService;
import com.bsit4d.bitsfms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private UserService userService;
    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @PreAuthorize("hasAuthority ('TREASURER')")
    public ResponseEntity save( TransactionModel transactionModel){
        return new ResponseEntity<>(transactionService.save(transactionModel), HttpStatus.OK);
    }
    @GetMapping("/allIgp")
    public ResponseEntity<List<TransactionModel>> getAllIgpTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllIgpTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/allCoh")
    public ResponseEntity<List<TransactionModel>> getAllCohTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllCohTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/allSm")
    public ResponseEntity<List<TransactionModel>> getAllSmTransactions() {
        try {
            List<TransactionModel> transactions = transactionService.findAllSmTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
