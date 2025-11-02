package com.bibliotheque.bibliotheque;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowRepository extends JpaRepository<Borrow , Long> {
}
