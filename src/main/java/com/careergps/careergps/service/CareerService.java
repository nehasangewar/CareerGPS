package com.careergps.careergps.service;

import com.careergps.careergps.dto.*;
import com.careergps.careergps.entity.User;
import com.careergps.careergps.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CareerService {

    @Autowired
    private UserRepository userRepository;

    // DIRECT GOAL
    public CareerResultResponse getDirectRoadmap(String goal, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CareerResultResponse result;

        switch (goal.toUpperCase()) {

            case "SOFTWARE DEVELOPMENT":
                result = new CareerResultResponse(
                        "Software Development",
                        "Focus on backend systems, APIs, and scalable applications.",
                        "Java → DSA → Backend → System Design"
                );
                break;

            case "WEB DEVELOPMENT":
                result = new CareerResultResponse(
                        "Web Development",
                        "Build responsive UI and full stack apps.",
                        "HTML → CSS → JS → React → Node"
                );
                break;

            default:
                result = new CareerResultResponse(
                        goal,
                        "Custom roadmap",
                        "Roadmap coming soon."
                );
        }

        // 🔥 SAVE TO DB
        user.setSelectedCareer(result.getCareerName());
        user.setCareerDescription(result.getDescription());
        user.setRoadmap(result.getRoadmap());
        userRepository.save(user);

        return result;
    }

    // ASSESSMENT LOGIC
    public CareerResultResponse evaluateAssessment(Long userId, AssessmentRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CareerResultResponse result;

        if (request.getTheoryPreference().equals("PRACTICAL")
                && request.getWorkType().equals("CODE")) {

            if (request.getDevPreference().equals("BACKEND")) {
                result = new CareerResultResponse(
                        "Software Development",
                        "Backend system building.",
                        "Java → APIs → Databases"
                );
            } else {
                result = new CareerResultResponse(
                        "Web Development",
                        "Frontend development.",
                        "HTML → CSS → JS → React"
                );
            }

        } else if (request.getTheoryPreference().equals("THEORY")
                && request.getWorkType().equals("NUMBERS")) {

            result = new CareerResultResponse(
                    "Data Analytics",
                    "Data insights and analysis.",
                    "Excel → SQL → Python → Visualization"
            );

        } else {
            result = new CareerResultResponse(
                    "Cyber Security",
                    "System protection & security.",
                    "Networking → Ethical Hacking"
            );
        }

        // 🔥 SAVE TO USER
        user.setSelectedCareer(result.getCareerName());
        user.setCareerDescription(result.getDescription());
        user.setRoadmap(result.getRoadmap());
        userRepository.save(user);

        return result;
    }
}