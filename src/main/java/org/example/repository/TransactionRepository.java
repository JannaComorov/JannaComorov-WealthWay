package org.example.repository;

import org.example.model.Transaction;
import org.example.model.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Găsește toate tranzacțiile de un anumit tip (INCOME sau EXPENSE)
    List<Transaction> findByType(TransactionType type);

    // Găsește tranzacțiile între două date
    List<Transaction> findByDateBetween(LocalDate startDate, LocalDate endDate);

    // Caută tranzacții după descriere (case-insensitive)
    List<Transaction> findByDescriptionContainingIgnoreCase(String description);
}
