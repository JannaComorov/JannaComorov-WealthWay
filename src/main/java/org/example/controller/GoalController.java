package org.example.controller;

import org.example.model.Goal;
import org.example.service.GoalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:5173")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public List<Goal> getAll() {
        return goalService.getAll();
    }

    @GetMapping("/{id}")
    public Goal getById(@PathVariable Long id) {
        return goalService.getById(id);
    }

    @PostMapping
    public Goal create(@RequestBody Goal goal) {
        if (!goal.isValid()) {
            throw new IllegalArgumentException("Datele obiectivului nu sunt valide.");
        }
        return goalService.create(goal);
    }

    @PutMapping("/{id}")
    public Goal update(@PathVariable Long id, @RequestBody Goal goal) {
        if (!goal.isValid()) {
            throw new IllegalArgumentException("Datele obiectivului nu sunt valide.");
        }
        return goalService.update(id, goal);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        goalService.delete(id);
    }
}
