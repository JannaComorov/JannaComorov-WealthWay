package org.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import org.example.model.History;


import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    Optional<History> findByMonth(String month); // caută o lună exactă

    List<History> findAllByOrderByMonthAsc();    // returnează tot istoricul sortat după lună
}
