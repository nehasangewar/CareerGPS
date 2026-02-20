package com.careergps.careergps.dto;

public class DashboardResponse {

    private String selectedCareer;
    private String careerDescription;
    private String roadmap;

    // ✅ Constructor with 3 parameters
    public DashboardResponse(String selectedCareer,
                             String careerDescription,
                             String roadmap) {
        this.selectedCareer = selectedCareer;
        this.careerDescription = careerDescription;
        this.roadmap = roadmap;
    }

    // Getters
    public String getSelectedCareer() {
        return selectedCareer;
    }

    public String getCareerDescription() {
        return careerDescription;
    }

    public String getRoadmap() {
        return roadmap;
    }

    // Setters
    public void setSelectedCareer(String selectedCareer) {
        this.selectedCareer = selectedCareer;
    }

    public void setCareerDescription(String careerDescription) {
        this.careerDescription = careerDescription;
    }

    public void setRoadmap(String roadmap) {
        this.roadmap = roadmap;
    }
}
