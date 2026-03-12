package com.amzingMovies.crudFilmes.controller;

import com.amzingMovies.crudFilmes.model.Filme;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/filmes")
public class filmeController {

    @PostMapping
    public void saveMovie(@RequestBody Filme filme){
        System.out.println("Filme registrado: " + filme);
    }
}
