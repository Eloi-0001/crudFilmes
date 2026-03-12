CREATE TABLE filmes (
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    genero VARCHAR(100),
    classificacao VARCHAR(20),
    diretor VARCHAR(255),
    duracao DECIMAL(4,2),
    preco DECIMAL(4,2),
    ano_publicacao INTEGER,
    em_cartaz BOOLEAN DEFAULT false
);