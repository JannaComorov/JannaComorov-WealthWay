package org.example.repository;

import org.example.model.Saving;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SavingRepository extends JpaRepository<Saving, Long> {

    // 📅 Economii într-un anumit interval de timp
    List<Saving> findByDateBetween(LocalDate startDate, LocalDate endDate);

    // 💰 Economii mai mari decât o sumă
    List<Saving> findByAmountGreaterThan(double amount);

    // 🔍 Căutare după text în notițe
    List<Saving> findByNoteContainingIgnoreCase(String keyword);
}
