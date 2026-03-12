package com.amzingMovies.crudFilmes.validation;

import com.amzingMovies.crudFilmes.model.Filme;

public class FilmeValidation {

    public class TituloValidation extends FilmeValidation {

        public void validar(Filme filme){
            System.out.println("Validando titulo do filme...");
        }
    }
    public class GeneroValidation extends FilmeValidation {

        public void validar(Filme filme){
            System.out.println("Validando titulo do filme...");
        }
    }
    public class ClassificacaoValidation extends FilmeValidation {

        public void validar(Filme filme){
            System.out.println("Validando cassificação do filme...");
        }
    }
    public class DiretorValidation extends FilmeValidation {

        public void validar(Filme filme){
            System.out.println("Validando o diretor do filme...");
        }
    }
    public class DuracaoValidation extends FilmeValidation {

        public void validar(Filme filme){
            System.out.println("Validando duracao do filme...");
        }
    }
    public class PrecoValidation extends FilmeValidation {

        public void validar(Filme filme){
            System.out.println("Validando preco do filme...");
        }
    }
    public class AnoPublicacaoValidation extends FilmeValidation {

        public void validar(Filme filme){
            System.out.println("Validando anoPublicacao do filme...");
        }
    }
    public class EmCartazValidation extends FilmeValidation {

        public void validar(Filme filme){
            System.out.println("Validando emCartaz do filme...");
        }
    }
}
