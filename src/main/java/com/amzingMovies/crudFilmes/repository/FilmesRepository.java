package com.amzingMovies.crudFilmes.repository;

import com.amzingMovies.crudFilmes.model.Filme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmesRepository extends JpaRepository<Filme, String> {
}
