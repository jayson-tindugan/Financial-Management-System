package com.bsit4d.backend.controller;

import com.bsit4d.backend.model.EmailModel;
import com.bsit4d.backend.model.UserModel;
import com.bsit4d.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class EmailController {
    @Autowired
    private UserService userService;


    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailModel emailModel) {
        userService.sendEmail(emailModel.getEmail(), emailModel.getSubject(), emailModel.getBody());
        return ResponseEntity.ok("Email sent successfully!");
    }
}
