package com.bsit4d.backend.model;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChartModel {
    private String transactionId;
    private String allocationType;
    private Float amount;
    private Float quantity;
    private Float total;
    private String transactionType;
    private Float CollectionBalance;
    private Float DonationBalance;
    private Float IgpBalance;
    private String particular;
    private String orNumber;
    private String remark;
    private Long idNumber;
    private LocalDateTime transactionDate;
    private Float balance;
    private Float totalInflows;
    private Float totalOutFlows;
    private Float netProfitLoss;



}
