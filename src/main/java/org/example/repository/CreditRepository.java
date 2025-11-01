package org.example.repository;

import org.example.model.Credit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Long> {

    // 🔍 Căutare după cuvânt cheie în descriere (case-insensitive)
    List<Credit> findByDescriptionContainingIgnoreCase(String keyword);

    // 🔄 Sortare descrescătoare după data de început
    List<Credit> findByOrderByStartDateDesc();
}
