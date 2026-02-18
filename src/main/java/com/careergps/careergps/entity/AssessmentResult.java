package com.careergps.careergps.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "assessment_results")
public class AssessmentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String careerTitle;
    private String description;
    private String roadmap;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters and Setters

    public Long getId() { return id; }

    public String getCareerTitle() { return careerTitle; }
    public void setCareerTitle(String careerTitle) { this.careerTitle = careerTitle; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getRoadmap() { return roadmap; }
    public void setRoadmap(String roadmap) { this.roadmap = roadmap; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
