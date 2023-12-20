package com.bsit4d.bitsfms.controller;


import com.bsit4d.bitsfms.model.LoginHistoryModel;
import com.bsit4d.bitsfms.model.LoginModel;
import com.bsit4d.bitsfms.model.TransactionModel;
import com.bsit4d.bitsfms.model.UserModel;

//import com.bsit4d.bitsfms.service.UserService;

import com.bsit4d.bitsfms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {


    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/dashboard")
    public ResponseEntity<Object> getMyDetails(){
        return new ResponseEntity(userService.loginUser(),HttpStatus.OK);
    }
    @PostMapping("/register")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity registerUser(@RequestBody UserModel userModel) {
        // Add authentication logic here to ensure only admin can register
        return new ResponseEntity(userService.registerUser(userModel), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity getAll() {
        return new ResponseEntity(userService.getAllUsers(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/get")
    public ResponseEntity getDetailsParam(@RequestParam(required = true) Long idNumber){
        return new ResponseEntity(userService.findDetails(idNumber),HttpStatus.OK);
    }

    @GetMapping("/getId/{idNumber}")
    public ResponseEntity getDetails(@PathVariable("idNumber") Long idNumber){
        return new ResponseEntity(userService.findDetails(idNumber),HttpStatus.OK);
    }

    @GetMapping("/logHistory")
    public ResponseEntity<List<LoginHistoryModel>> getAllLoginHistory() {
        try {
            List<LoginHistoryModel> loginHistory = userService.findLoginHistory();
            return new ResponseEntity<>(loginHistory, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


//    @PostMapping("/login")
//    public UserEntity login(@RequestParam Long idNumber,@RequestParam String password) {
//        return userService.login(idNumber, password);
//    }
//
//    @GetMapping("/all")
//    public List<UserEntity> getAllUsers() {
//        return userService.getAllUsers();
//    }
//
//    @GetMapping("/byRole")
//    public List<UserEntity> getUsersByRole(@RequestParam String role) {
//        // Add authentication logic here to ensure only admin can access
//        return userService.getUsersByRole(role);
//    }
//

}