package org.example.repository;

import org.example.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    // Doar metode CRUD implicite: findAll, findById, save, deleteById etc.
}
