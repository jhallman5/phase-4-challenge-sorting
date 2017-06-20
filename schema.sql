DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS users;

CREATE TABLE albums (
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL,
  username VARCHAR(25) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(25) NOT NULL
);
