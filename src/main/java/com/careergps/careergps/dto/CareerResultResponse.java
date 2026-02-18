package com.careergps.careergps.dto;

public class CareerResultResponse {

    private String title;
    private String description;
    private String roadmap;

    // Constructor
    public CareerResultResponse(String title, String description, String roadmap) {
        this.title = title;
        this.description = description;
        this.roadmap = roadmap;
    }

    // Getters
    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getRoadmap() {
        return roadmap;
    }
}