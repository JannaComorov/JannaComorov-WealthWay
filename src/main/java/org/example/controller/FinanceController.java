package org.example.controller;

        import org.example.model.FinanceSummary;
        import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/finance")
@CrossOrigin(origins = "http://localhost:5173")
public class FinanceController {

    // ✅ returnează date de test
    @GetMapping("/summary")
    public FinanceSummary getSummary() {
        return new FinanceSummary(10000, 4500, 1500, 1000);
    }

    @PostMapping("/summary")
    public FinanceSummary saveSummary(@RequestBody FinanceSummary summary) {
        System.out.println("📥 Salvat din frontend: " + summary);
        return summary;
    }
}
