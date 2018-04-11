-- Up
CREATE TABLE inscriptions (
  id INTEGER PRIMARY KEY,
  nom VARCHAR(50),
  prenom VARCHAR(50),
  pseudo VARCHAR(50),
  email VARCHAR(50),
  motdepasse VARCHAR(50),
  ville VARCHAR(50),
  monequipepreferee VARCHAR(50)
);

-- Down
DROP TABLE matchs;
