package org.example.repository;

import org.example.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

    /**
     * Returnează toate veniturile asociate unui buget specific (prin ID).
     *
     * Exemplu: pentru afișarea tuturor veniturilor lunii aprilie.
     */
    List<Income> findByBudgetId(Long budgetId);
}
