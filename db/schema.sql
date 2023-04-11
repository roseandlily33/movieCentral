DROP DATABASE IF EXISTS movies_db;
CREATEDATABASE movies_db;

USE movies_db;

CREATE TABLE movies(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    movie_name VARCHAR(100) NOT NULL
)

CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    review TEXT NOT NULL,
    FOREIGN KEY(movie_id) 
    REFERENCE movies(id)
)