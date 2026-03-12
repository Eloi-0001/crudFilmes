package com.amzingMovies.crudFilmes.controller;

import com.amzingMovies.crudFilmes.model.Filme;
import com.amzingMovies.crudFilmes.repository.FilmesRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/filmes")
public class filmeController {

    public FilmesRepository filmesRepository;

    public filmeController(FilmesRepository filmesRepository) {
        this.filmesRepository = filmesRepository;
    }

    @PostMapping
    public Filme saveMovie(@RequestBody Filme filme){
        System.out.println("Filme registrado: " + filme);
        var id = UUID.randomUUID().toString();
        filme.setId(id);
        filmesRepository.save(filme);
        return filme;
    }

    @GetMapping("/{id}")
    public Filme consultMovie(@PathVariable("id") String id){
        return filmesRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable("id") String id){
        filmesRepository.deleteById(id);
    }

    @PutMapping
    public void updateMovie(@PathVariable("id") String id, Filme filme){
        filme.setId(id);
        filmesRepository.save(filme);
    }
}
