package com.careergps.careergps.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // ✅ field name is id

    private String fullName;
    private String email;
    private String password;

    private String selectedCareer;
    private String careerDescription;

    @Column(length = 2000)
    private String roadmap;

    // ===== Getters and Setters =====

    public Long getId() {   // ✅ NOT getUserId()
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSelectedCareer() {
        return selectedCareer;
    }

    public void setSelectedCareer(String selectedCareer) {
        this.selectedCareer = selectedCareer;
    }

    public String getCareerDescription() {
        return careerDescription;
    }

    public void setCareerDescription(String careerDescription) {
        this.careerDescription = careerDescription;
    }

    public String getRoadmap() {
        return roadmap;
    }

    public void setRoadmap(String roadmap) {
        this.roadmap = roadmap;
    }
}