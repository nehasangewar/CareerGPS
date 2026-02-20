package com.careergps.careergps.dto;

public class CareerResultResponse {

    private String careerName;
    private String description;
    private String roadmap;

    // Constructor
    public CareerResultResponse(String careerName, String description, String roadmap) {
        this.careerName = careerName;
        this.description = description;
        this.roadmap = roadmap;
    }

    // 🔥 VERY IMPORTANT GETTERS

    public String getCareerName() {
        return careerName;
    }

    public String getDescription() {
        return description;
    }

    public String getRoadmap() {
        return roadmap;
    }
}