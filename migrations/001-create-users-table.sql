-- Up
CREATE TABLE matchs (
  id INTEGER PRIMARY KEY,
  teamHome VARCHAR(50),
  teamOut VARCHAR(50),
  scoreTeamHome INT,
  scoreTeamOut INT,
  hours DATE,
  localisation VARCHAR(50)
);

-- Down
DROP TABLE matchs;

-- Up
CREATE TABLE wilders (
  id INTEGER PRIMARY KEY,
  nom VARCHAR(50),
  prenom VARCHAR(50),
  pseudo VARCHAR(50),
  mail VARCHAR(50),
  motdepasse VARCHAR(50) ,
  city VARCHAR(50),
  equipepreferee VARCHAR(50)
);

-- Down
DROP TABLE wilders;
