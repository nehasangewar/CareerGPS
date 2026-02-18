package com.careergps.careergps.controller;

import com.careergps.careergps.dto.AssessmentRequest;
import com.careergps.careergps.dto.CareerResultResponse;
import com.careergps.careergps.dto.GoalRequest;
import com.careergps.careergps.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/career")
@CrossOrigin("*")   // allows Postman / frontend calls
public class CareerController {

    @Autowired
    private CareerService careerService;

    // ===============================
    // 1️⃣ Direct Goal (User says YES)
    // ===============================
    @PostMapping("/goal/{userId}")
    public CareerResultResponse handleGoal(
            @PathVariable Long userId,
            @RequestBody GoalRequest request) {

        return careerService.getDirectRoadmap(
                request.getSelectedGoal(),
                userId
        );
    }

    // ====================================
    // 2️⃣ Assessment (User says NO)
    // ====================================
    @PostMapping("/assess/{userId}")
    public CareerResultResponse assess(
            @PathVariable Long userId,
            @RequestBody AssessmentRequest request) {

        return careerService.evaluateAndSave(userId, request);
    }
}