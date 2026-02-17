package com.careergps.careergps.service;

import com.careergps.careergps.dto.*;
import com.careergps.careergps.entity.*;
import com.careergps.careergps.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CareerService {

    @Autowired
    private AssessmentResultRepository assessmentResultRepository;

    @Autowired
    private UserRepository userRepository;

    // ===============================
    // DIRECT GOAL
    // ===============================
    public CareerResultResponse getDirectRoadmap(String goal, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CareerResultResponse response;

        switch (goal.toUpperCase()) {

            case "SOFTWARE DEVELOPMENT":
                response = new CareerResultResponse(
                        "Software Development",
                        "Backend systems and scalable apps.",
                        "Java → DSA → Backend → System Design"
                );
                break;

            case "WEB DEVELOPMENT":
                response = new CareerResultResponse(
                        "Web Development",
                        "Frontend and full-stack development.",
                        "HTML → CSS → JS → React → Node"
                );
                break;

            default:
                response = new CareerResultResponse(
                        goal,
                        "Custom roadmap.",
                        "Roadmap coming soon."
                );
        }

        saveResult(user, response);

        return response;
    }

    // ===============================
    // ASSESSMENT
    // ===============================
    public CareerResultResponse evaluateAndSave(Long userId, AssessmentRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CareerResultResponse response = evaluateLogic(request);

        saveResult(user, response);

        return response;
    }

    // ===============================
    // CORE LOGIC
    // ===============================
    private CareerResultResponse evaluateLogic(AssessmentRequest request) {

        if ("PRACTICAL".equals(request.getTheoryPreference())
                && "CODE".equals(request.getWorkType())) {

            if ("SECURITY".equals(request.getPracticalInterest())) {
                return new CareerResultResponse(
                        "Cyber Security",
                        "Protect systems and find vulnerabilities.",
                        "Networking → Ethical Hacking → Security Tools"
                );
            }

            if ("BACKEND".equals(request.getDevPreference())) {
                return new CareerResultResponse(
                        "Software Development",
                        "Backend logic building.",
                        "Java → APIs → Databases"
                );
            }

            return new CareerResultResponse(
                    "Web Development",
                    "Frontend and UI.",
                    "HTML → CSS → React"
            );
        }

        if ("THEORY".equals(request.getTheoryPreference())
                && "NUMBERS".equals(request.getWorkType())) {

            if ("INSIGHTS".equals(request.getDataInterest())) {
                return new CareerResultResponse(
                        "Data Analytics",
                        "Business data insights.",
                        "Excel → SQL → Python"
                );
            }

            return new CareerResultResponse(
                    "AI / ML",
                    "Machine learning models.",
                    "Python → ML → Deep Learning"
            );
        }

        return new CareerResultResponse(
                "General Tech",
                "Start with fundamentals.",
                "Programming basics"
        );
    }

    // ===============================
    // SAVE TO DATABASE
    // ===============================
    private void saveResult(User user, CareerResultResponse response) {

        AssessmentResult result = new AssessmentResult();
        result.setUser(user);
        result.setCareerTitle(response.getTitle());
        result.setDescription(response.getDescription());
        result.setRoadmap(response.getRoadmap());

        assessmentResultRepository.save(result);
    }
}