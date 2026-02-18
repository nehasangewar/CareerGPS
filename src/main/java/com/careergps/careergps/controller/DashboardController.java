package com.careergps.careergps.controller;

import com.careergps.careergps.dto.DashboardResponse;
import com.careergps.careergps.service.DashboardService;
import com.careergps.careergps.service.UserService;
import com.careergps.careergps.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public DashboardResponse getDashboard(
            @RequestHeader("Authorization") String authHeader
    ) {

        String token = authHeader.substring(7); // remove "Bearer "
        String email = jwtUtil.extractUsername(token);

        Long userId = userService.getUserIdByEmail(email);

        return dashboardService.getDashboard(userId);
    }
}