package com.bibliotheque.bibliotheque;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book , Long> {
}
