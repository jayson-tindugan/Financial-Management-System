package com.bsit4d.backend.model;

public class EmailModel {

    private String email;
    private String subject;
    private String body;

    // Getters and setters

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public EmailModel(String email, String subject, String body) {
        this.email = email;
        this.subject = subject;
        this.body = body;
    }
}
