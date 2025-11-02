package com.bibliotheque.bibliotheque;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        reservation.setStatus("EN_ATTENTE");
        return reservationRepository.save(reservation);
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getresrvation() {
        return new ResponseEntity<>(reservationRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getReservationsByUser(@PathVariable Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Reservation> DeletResrvation(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isPresent()) {
            reservationRepository.deleteById(id);
            return new ResponseEntity<>(reservation.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<String> accepterlesresrvation(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isPresent()) {
            Reservation r = reservation.get();
            r.setStatus("ACCEPTEE");
            reservationRepository.save(r);
            return ResponseEntity.ok("Réservation acceptée");
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}/refuse")
    public ResponseEntity<String> RefuserReservation(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isPresent()) {
            Reservation r = reservation.get();
            r.setStatus("REFUSEE");
            reservationRepository.save(r);
            return ResponseEntity.ok("Réservation refusée");
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
