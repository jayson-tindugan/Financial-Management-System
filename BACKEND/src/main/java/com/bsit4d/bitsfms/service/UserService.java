package com.bsit4d.bitsfms.service;

import com.bsit4d.bitsfms.model.LoginHistoryModel;
import com.bsit4d.bitsfms.model.LoginModel;
import com.bsit4d.bitsfms.model.TransactionModel;
import com.bsit4d.bitsfms.model.UserModel;
import com.bsit4d.bitsfms.repository.LoginHistoryRepository;
import com.bsit4d.bitsfms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LoginHistoryRepository loginHistoryRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            if (username == null || username.isEmpty()) {
                throw new IllegalArgumentException("Username cannot be null or empty");
            }
            Optional<UserModel> userModel = userRepository.findByIdNumber(Long.parseLong(username));
            if (userModel.isPresent()) {
                LoginModel loginModel = new LoginModel(userModel.get());
                // Log roles to check if they are correct
                System.out.println("User Roles: " + loginModel.getAuthorities());
                LoginHistoryModel loginHistory = new LoginHistoryModel();
                loginHistory.setIdNumber(Long.parseLong(loginModel.getUsername()));
                loginHistory.setLogDate(LocalDateTime.now());
                loginHistoryRepository.save(loginHistory);
                return loginModel;
            } else {
                throw new UsernameNotFoundException("User does not exist");
            }
        } catch (Exception e) {
            // Log any exceptions
            e.printStackTrace();
            throw new UsernameNotFoundException("Error loading user by username", e);
        }
    }
        public String loginUser() {
            userRepository.findByIdNumber(Long.valueOf(getLoggedInUserDetails().getUsername()));
            return "Logged in successfully";

        }
    public List<LoginHistoryModel> findLoginHistory() {
        try {
            return loginHistoryRepository.findByIdNumber(Long.valueOf(getLoggedInUserDetails().getUsername()));
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            e.printStackTrace();
            throw new RuntimeException("Error retrieving IGP transactions", e);
        }
    }

        public UserDetails getLoggedInUserDetails(){
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if(authentication != null && authentication.getPrincipal() instanceof UserDetails){
                return (UserDetails) authentication.getPrincipal();
            }
            return  null;
        }

    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }
    public UserModel findDetails(Long idNumber) {
        return  userRepository.findByIdNumber(idNumber).get();
    }

    public List<UserModel> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }

    public String registerUser(UserModel userModel) {
        // Add any additional validation or business logic here

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

}
