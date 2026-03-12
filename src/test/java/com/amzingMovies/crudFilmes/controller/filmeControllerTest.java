package com.amzingMovies.crudFilmes.controller;

import com.amzingMovies.crudFilmes.model.Filme;
import com.amzingMovies.crudFilmes.repository.FilmesRepositoryTest;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@DataJpaTest
@ActiveProfiles("test")
class  filmeControllerTest {


    @Autowired
    EntityManager entityManager;
    @Autowired
    private FilmesRepositoryTest filmesRepositoryTest;

    @Test
    @RequestMapping("/filmes")
    public void saveMovie(@RequestBody Filme filme){
        System.out.println("Filme registrado: " + filme);
        var id = UUID.randomUUID().toString();
        filme.setId(id);
        filmesRepositoryTest.save(filme);
    }

    @Test
    @DisplayName("Consultar o filme foi um sucesso!")
    @GetMapping("/{id}")
    public Filme consultMovie(@PathVariable("id") String id){
        return filmesRepositoryTest.findById(id).orElse(null);
    }


    @Test
    @DisplayName("Deletar dados de um filme")
    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable("id") String id){
        filmesRepositoryTest.deleteById(id);
    }


    @Test
    @PutMapping
    public void updateMovie(@PathVariable("id") String id, Filme filme){
        filme.setId(id);
        filmesRepositoryTest.save(filme);
    }
}
