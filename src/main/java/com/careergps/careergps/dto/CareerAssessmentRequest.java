package com.careergps.careergps.dto;

public class CareerAssessmentRequest {

    private boolean hasGoal;
    private String theoryPreference;     // THEORY or PRACTICAL
    private String workType;             // CODE or NUMBERS
    private String practicalInterest;    // BUILDING or SECURITY
    private String dataInterest;         // INSIGHTS or MODELS
    private String devPreference;        // BACKEND or FRONTEND

    public boolean isHasGoal() {
        return hasGoal;
    }

    public void setHasGoal(boolean hasGoal) {
        this.hasGoal = hasGoal;
    }

    public String getTheoryPreference() {
        return theoryPreference;
    }

    public void setTheoryPreference(String theoryPreference) {
        this.theoryPreference = theoryPreference;
    }

    public String getWorkType() {
        return workType;
    }

    public void setWorkType(String workType) {
        this.workType = workType;
    }

    public String getPracticalInterest() {
        return practicalInterest;
    }

    public void setPracticalInterest(String practicalInterest) {
        this.practicalInterest = practicalInterest;
    }

    public String getDataInterest() {
        return dataInterest;
    }

    public void setDataInterest(String dataInterest) {
        this.dataInterest = dataInterest;
    }

    public String getDevPreference() {
        return devPreference;
    }

    public void setDevPreference(String devPreference) {
        this.devPreference = devPreference;
    }
}
