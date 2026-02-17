package com.careergps.careergps.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_career_assessments")
public class UserCareerAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String theoryPreference;
    private String workType;
    private String practicalInterest;
    private String dataInterest;
    private String devPreference;

    private String resultCareer;

    private LocalDateTime createdAt = LocalDateTime.now();

    // 🔗 Relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters & Setters

    public Long getId() { return id; }

    public String getTheoryPreference() { return theoryPreference; }
    public void setTheoryPreference(String theoryPreference) { this.theoryPreference = theoryPreference; }

    public String getWorkType() { return workType; }
    public void setWorkType(String workType) { this.workType = workType; }

    public String getPracticalInterest() { return practicalInterest; }
    public void setPracticalInterest(String practicalInterest) { this.practicalInterest = practicalInterest; }

    public String getDataInterest() { return dataInterest; }
    public void setDataInterest(String dataInterest) { this.dataInterest = dataInterest; }

    public String getDevPreference() { return devPreference; }
    public void setDevPreference(String devPreference) { this.devPreference = devPreference; }

    public String getResultCareer() { return resultCareer; }
    public void setResultCareer(String resultCareer) { this.resultCareer = resultCareer; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}

