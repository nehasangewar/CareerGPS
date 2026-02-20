package com.careergps.careergps.service;

import com.careergps.careergps.dto.DashboardResponse;
import com.careergps.careergps.entity.User;
import com.careergps.careergps.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    public DashboardResponse getDashboard(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new DashboardResponse(
                user.getSelectedCareer(),
                user.getCareerDescription(),
                user.getRoadmap()
        );
    }
}
