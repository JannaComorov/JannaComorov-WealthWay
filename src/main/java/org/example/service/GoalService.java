package org.example.service;

import org.example.model.Goal;
import org.example.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {

    private final GoalRepository goalRepository;

    public GoalService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    // 🔹 Obține toate obiectivele
    public List<Goal> getAll() {
        return goalRepository.findAll();
    }

    // 🔹 Găsește un obiectiv după ID sau returnează null
    public Goal getById(Long id) {
        return goalRepository.findById(id).orElse(null);
    }

    // 🔹 Creează un obiectiv nou (cu validare)
    public Goal create(Goal goal) {
        if (!goal.isValid()) {
            throw new IllegalArgumentException("Datele obiectivului nu sunt valide.");
        }
        return goalRepository.save(goal);
    }

    // 🔹 Actualizează un obiectiv existent
    public Goal update(Long id, Goal updatedGoal) {
        if (!updatedGoal.isValid()) {
            throw new IllegalArgumentException("Datele obiectivului nu sunt valide.");
        }
        updatedGoal.setId(id);
        return goalRepository.save(updatedGoal);
    }

    // 🔹 Șterge un obiectiv dacă există
    public void delete(Long id) {
        if (!goalRepository.existsById(id)) {
            throw new IllegalArgumentException("Obiectivul cu ID-ul " + id + " nu există.");
        }
        goalRepository.deleteById(id);
    }
}
