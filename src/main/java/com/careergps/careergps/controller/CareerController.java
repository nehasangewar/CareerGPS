package com.careergps.careergps.controller;

import com.careergps.careergps.dto.*;
import com.careergps.careergps.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/career")
public class CareerController {

    @Autowired
    private CareerService careerService;

    @PostMapping("/goal/{userId}")
    public CareerResultResponse handleGoal(
            @PathVariable Long userId,
            @RequestBody GoalRequest request) {

        return careerService.getDirectRoadmap(
                request.getSelectedGoal(),
                userId
        );
    }

    @PostMapping("/assess/{userId}")
    public CareerResultResponse assess(
            @PathVariable Long userId,
            @RequestBody AssessmentRequest request) {

        return careerService.evaluateAssessment(userId, request);
    }
}