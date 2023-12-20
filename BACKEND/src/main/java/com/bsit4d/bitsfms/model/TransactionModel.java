package com.bsit4d.bitsfms.model;

import jakarta.persistence.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "transaction")
public class TransactionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String transactionId;


    private String allocationType;
    private Float amount;
    private String transactionType;
    @Column(nullable = true)
    private Float IgpBalance;
    @Column(nullable = true)
    private Float CohBalance;
    @Column(nullable = true)
    private Float SmBalance;
    private Long idNumber;


    public Float getSmBalance() {
        return SmBalance;
    }

    public void setSmBalance(Float smBalance) {
        SmBalance = smBalance;
    }

    @Temporal(TemporalType.DATE)
    private LocalDate transactionDate;

    @Column(nullable = true)
    private Long studentNumber;
    private String remark;

    public TransactionModel() {
        this.transactionId = generateTransactionId();
    }

    // Custom method to generate a formatted transactionId
    private String generateTransactionId() {
        String year = String.valueOf(LocalDate.now().getYear());

        String uuid = UUID.randomUUID().toString().toUpperCase().substring(0, 6); // Use part of the UUID

        return "BITS" + year + "-" + uuid;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }


    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public String getAllocationType() {
        return allocationType;
    }

    public void setAllocationType(String allocationType) {
        this.allocationType = allocationType;
    }

    public Long getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(Long idNumber){
        this.idNumber = idNumber;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Float getIgpBalance() {
        return IgpBalance;
    }

    public void setIgpBalance(Float igpBalance) {
        IgpBalance = igpBalance;
    }

    public Float getCohBalance() {
        return CohBalance;
    }

    public void setCohBalance(Float cohBalance) {
        CohBalance = cohBalance;
    }

    public Long getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(Long studentNumber) {
        this.studentNumber = studentNumber;
    }
}
