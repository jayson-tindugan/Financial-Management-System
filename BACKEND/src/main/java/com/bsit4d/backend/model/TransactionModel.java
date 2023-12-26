package com.bsit4d.backend.model;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
@NoArgsConstructor
@Entity
@Table(name = "transaction")
public class TransactionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Double id;
    @Column(unique = true)
    private String transactionId;

    private String allocationType;
    private Double amount;
    private Double quantity;
    private Double total;
    private String transactionType;
    @Column(nullable = true)
    private String particular;
    @Column(nullable = true)
    private String orNumber;
    @Column(nullable = true)
    private String remark;
    private Double idNumber;
    private Double balance;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @OrderBy("transactionDate ASC")
    private LocalDateTime transactionDate;



    // Custom method to generate a formatted transactionId
    private String generateTransactionId() {
        String year = String.valueOf(LocalDate.now().getYear());

        String uuid = UUID.randomUUID().toString().toUpperCase().substring(0, 6); // Use part of the UUID

        return "BITS" + year + "-" + uuid;
    }


    public Double getId() {
        return id;
    }

    public void setId(Double id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getAllocationType() {
        return allocationType;
    }

    public void setAllocationType(String allocationType) {
        this.allocationType = allocationType;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getParticular() {
        return particular;
    }

    public void setParticular(String particular) {
        this.particular = particular;
    }

    public String getOrNumber() {
        return orNumber;
    }

    public void setOrNumber(String orNumber) {
        this.orNumber = orNumber;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Double getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(Double idNumber) {
        this.idNumber = idNumber;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balanceCollection, Double balanceDonation, Double balanceIGP) {
        if ("COLLECTION".equals(this.allocationType)) {
            this.balance = balanceCollection;
        } else if ("DONATION".equals(this.allocationType)) {
            this.balance = balanceDonation;
        } else if ("IGP".equals(this.allocationType)) {
            this.balance = balanceIGP;
        }
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public TransactionModel(Double id, String transactionId, String allocationType, Double amount, Double quantity, Double total, String transactionType, String particular, String orNumber, String remark, Double idNumber, Double balance, LocalDateTime transactionDate) {
        this.id = id;
        this.transactionId = transactionId;
        this.allocationType = allocationType;
        this.amount = amount;
        this.quantity = quantity;
        this.total = total;
        this.transactionType = transactionType;
        this.particular = particular;
        this.orNumber = orNumber;
        this.remark = remark;
        this.idNumber = idNumber;
        balance = balance;
        this.transactionDate = transactionDate;
    }
}
