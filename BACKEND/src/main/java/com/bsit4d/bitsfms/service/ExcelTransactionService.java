package com.bsit4d.bitsfms.service;

import com.bsit4d.bitsfms.model.TransactionModel;
import com.bsit4d.bitsfms.model.UserModel;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

@Service
public class ExcelTransactionService {
    public byte[] generateExcel(List<TransactionModel> transactions) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Map<String, Sheet> sheets = new HashMap<>();

            // Create sheets for each allocation type
            for (TransactionModel transaction : transactions) {
                String allocationType = transaction.getAllocationType();
                if (!sheets.containsKey(allocationType)) {
                    sheets.put(allocationType, workbook.createSheet(allocationType));
                    createHeaderRow(sheets.get(allocationType), workbook);
                }

                addTransactionRow(sheets.get(allocationType), transaction);
            }

            // Adjust column widths and set header style for all sheets
            for (Sheet sheet : sheets.values()) {
                autoSizeColumns(sheet);
            }

            // Write to ByteArrayOutputStream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

    private void createHeaderRow(Sheet sheet, Workbook workbook) {
        Row headerRow = sheet.createRow(0);
        CellStyle headerStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        headerStyle.setFont(font);

        // Set the style for each header cell
        for (int i = 0; i < 7; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellStyle(headerStyle);
        }

        headerRow.getCell(0).setCellValue("Transaction ID");
        headerRow.getCell(1).setCellValue("Transaction Type");
        headerRow.getCell(2).setCellValue("Amount");
        headerRow.getCell(3).setCellValue("Balance");
        headerRow.getCell(4).setCellValue("Transaction Date");
        headerRow.getCell(5).setCellValue("Remark");
        headerRow.getCell(6).setCellValue("ID Number");
    }

    private void addTransactionRow(Sheet sheet, TransactionModel transaction) {
        int rowNum = sheet.getLastRowNum() + 1;
        Row row = sheet.createRow(rowNum);
        row.createCell(0).setCellValue(transaction.getTransactionId());
        row.createCell(1).setCellValue(transaction.getTransactionType());
        row.createCell(2).setCellValue(transaction.getAmount());

        // Set the 'balance' value in the appropriate column based on the allocation type
        String allocationType = transaction.getAllocationType();
        setBalanceCellValue(row, transaction, allocationType);

        row.createCell(4).setCellValue(transaction.getTransactionDate().toString());
        row.createCell(5).setCellValue(transaction.getRemark());
        row.createCell(6).setCellValue(transaction.getIdNumber());
    }

    private void setBalanceCellValue(Row row, TransactionModel transaction, String allocationType) {
        // Set the 'balance' value in the appropriate column based on the allocation type
        switch (allocationType) {
            case "COH":
                row.createCell(3).setCellValue(transaction.getCohBalance());
                break;
            case "IGP":
                row.createCell(3).setCellValue(transaction.getIgpBalance());
                break;
            case "SM":
                row.createCell(3).setCellValue(transaction.getSmBalance());
                break;
            default:
                row.createCell(3).setCellValue(transaction.getSmBalance()); // Default or handle additional cases as needed
        }
    }

    private void autoSizeColumns(Sheet sheet) {
        for (int i = 0; i < sheet.getRow(0).getPhysicalNumberOfCells(); i++) {
            sheet.autoSizeColumn(i);
        }
    }
}