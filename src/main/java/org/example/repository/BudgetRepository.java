package org.example.repository;

import org.example.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    // 🔍 Caută exact după categorie
    List<Budget> findByCategory(String category);

    // 📅 Bugete care încep între două date (interval personalizat)
    List<Budget> findByStartDateBetween(LocalDate startDate, LocalDate endDate);

    // ⏰ Bugete expirate (endDate < azi)
    List<Budget> findByEndDateBefore(LocalDate currentDate);

    // ✅ Bugete active (startDate < azi < endDate)
    List<Budget> findByStartDateBeforeAndEndDateAfter(LocalDate today, LocalDate todayAgain);

    // 🔎 Căutare parțială și fără diferențiere între majuscule/minuscule
    List<Budget> findByCategoryContainingIgnoreCase(String category);
}
