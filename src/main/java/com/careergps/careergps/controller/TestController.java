package com.careergps.careergps.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

    @RestController
    public class TestController {

        @GetMapping("/")
        public String home() {
            return "Career GPS Backend Running Successfully 🚀";
        }
    }

