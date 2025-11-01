package org.example.controller;

import org.example.model.Credit;
import org.example.service.CreditService;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/credits")
@CrossOrigin(origins = "http://localhost:5173s")
public class CreditController {

    private final CreditService service;

    public CreditController(CreditService service) {
        this.service = service;
    }

    // 1️⃣ Obține toate creditele
    @GetMapping
    public List<Credit> getAll() {
        return service.getAll();
    }

    // 2️⃣ Creează un nou credit
    @PostMapping
    public Credit save(@RequestBody Credit credit) {
        return service.save(credit);
    }

    // 3️⃣ Actualizează un credit existent
    @PutMapping("/{id}")
    public Credit update(@PathVariable Long id, @RequestBody Credit credit) {
        credit.setId(id);
        return service.save(credit);
    }

    // 4️⃣ Șterge un credit după ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // 5️⃣ Calculează totalul ratelor active pentru o lună (ex: ?month=2025-04)
    @GetMapping("/active-rate")
    public double getTotalActiveMonthlyRate(@RequestParam String month) {
        YearMonth yearMonth = YearMonth.parse(month); // format: "yyyy-MM"
        return service.getTotalActiveMonthlyRate(yearMonth);
    }
}
