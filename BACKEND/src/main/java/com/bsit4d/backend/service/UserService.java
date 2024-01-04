package com.bsit4d.backend.service;


import com.bsit4d.backend.model.LoginHistoryModel;
import com.bsit4d.backend.model.LoginModel;
import com.bsit4d.backend.model.UserModel;
import com.bsit4d.backend.repository.LoginHistoryRepository;
import com.bsit4d.backend.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.Multipart;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LoginHistoryRepository loginHistoryRepository;

    public List<UserModel> getAllUsers() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            // Log the exception or handle it based on your application's needs
            throw new RuntimeException("Error retrieving all users", e);
        }
    }

    public UserModel findDetails(Long idNumber) {
        try {
            Optional<UserModel> userOptional = userRepository.findById(idNumber);
            return userOptional.orElseThrow(() -> new RuntimeException("User not found with ID: " + idNumber));
        } catch (Exception e) {
            // Log the exception or handle it based on your application's needs
            throw new RuntimeException("Error retrieving user details", e);
        }
    }
    public UserModel findUserDetails(UserModel userModel) {
        try {
            UserDetails userOptional = loadUserByUsername(String.valueOf(userModel.getIdNumber()));
            return userModel;
        } catch (Exception e) {
            // Log the exception or handle it based on your application's needs
            throw new RuntimeException("Error retrieving user details", e);
        }
    }

    public List<UserModel> getUsersByRole(String role) {
        try {
            return userRepository.findByRole(role);
        } catch (Exception e) {
            // Log the exception or handle it based on your application's needs
            throw new RuntimeException("Error retrieving users by role", e);
        }
    }

    public Long countUsersExcludingAdmin() {
        return userRepository.countByRoleIsNotAndStatus("ADMIN","ACTIVE");
    }

    public String registerUser(UserModel userModel) {
        try {
            // Check if the idNumber already exists
            if (userRepository.existsByIdNumber(userModel.getIdNumber())) {
                return "ID number already exists";
            }
            else {
                // Hash the password using BCrypt
                String hashedPassword = new BCryptPasswordEncoder().encode(userModel.getPassword());
                userModel.setPassword(hashedPassword);

                // Save the user to the database
                userRepository.save(userModel);
                return "Registered successfully!";
            }

        } catch (DataIntegrityViolationException e) {
            // Handle any database integrity violations, such as unique constraint violation
            throw new IllegalArgumentException("Error registering user: " + e.getMessage(), e);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            Optional<UserModel> userModel = userRepository.findByIdNumber(Long.parseLong(username));
            if (userModel.isPresent()) {
                LoginModel loginModel = new LoginModel(userModel.get());
                System.out.println("User Roles: " + loginModel.getAuthorities());
                //If user logs in, record it to login history
                LoginHistoryModel loginHistory = new LoginHistoryModel();
                loginHistory.setIdNumber(Long.parseLong(loginModel.getUsername()));
                loginHistory.setLogDate(LocalDateTime.now());
                loginHistoryRepository.save(loginHistory);
                return loginModel;
            } else {
                throw new UsernameNotFoundException("User does not exist");
            }
        } catch (Exception e) {
            throw new UsernameNotFoundException("Error loading user by username", e);
        }
    }

    public List<LoginHistoryModel> findLoginHistory() {
        try {
            List<LoginHistoryModel> loginHistoryList = loginHistoryRepository.findByIdNumber(Long.valueOf(getLoggedInUserDetails().getUsername()));
            Collections.reverse(loginHistoryList);
            return loginHistoryList;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error retrieving login history", e);
        }
    }

    public UserDetails getLoggedInUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return (UserDetails) authentication.getPrincipal();
        } else {
            // Handle the case when the user is not authenticated
            throw new RuntimeException("User not authenticated");
        }
    }



    @Autowired
    private JavaMailSender javaMailSender;
    public void sendEmail(String email, String subject, String body) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();


        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom("clydesolas01@gmail.com", "BITS Financial Management System");
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(body,true);


            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

}