package com.careergps.careergps.dto;

public class GoalCheckRequest {

    private boolean hasGoal;
    private String selectedGoal; // Optional, if yes

    public boolean isHasGoal() {
        return hasGoal;
    }

    public void setHasGoal(boolean hasGoal) {
        this.hasGoal = hasGoal;
    }

    public String getSelectedGoal() {
        return selectedGoal;
    }

    public void setSelectedGoal(String selectedGoal) {
        this.selectedGoal = selectedGoal;
    }
}
