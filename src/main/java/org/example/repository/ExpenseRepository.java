package org.example.repository;

import org.example.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {


    // 📅 Găsește cheltuieli într-un anumit interval
    List<Expense> findByDateBetween(String startDate, String endDate);

    // 💰 Găsește cheltuieli peste o anumită sumă
    List<Expense> findByRequiredGreaterThan(double minRequired);
}
