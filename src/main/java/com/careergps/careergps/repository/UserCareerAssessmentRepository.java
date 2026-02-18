package com.careergps.careergps.repository;

import com.careergps.careergps.entity.UserCareerAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserCareerAssessmentRepository
        extends JpaRepository<UserCareerAssessment, Long> {

    List<UserCareerAssessment> findByUserId(Long userId);
}

