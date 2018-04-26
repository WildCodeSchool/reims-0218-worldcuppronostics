-- Up

CREATE TABLE matchs (
  id INTEGER PRIMARY KEY,
  teamHome VARCHAR(50),
  teamOut VARCHAR(50),
  scoreTeamHome INTEGER,
  scoreTeamOut INTEGER,
  hours DATE,
  localisation VARCHAR(50),
  groupe VARCHAR(50),
  drapeauHome VARCHAR(100),
  drapeauOut VARCHAR(100),
  numberMatch INTEGER
);


CREATE TABLE wilders (
  id INTEGER PRIMARY KEY,
  nom VARCHAR(50),
  prenom VARCHAR(50),
  pseudo VARCHAR(50),
  mail VARCHAR(50),
  motdepasse VARCHAR(50) ,
  city VARCHAR(50),
  equipepreferee VARCHAR(50),
  admin BOOLEAN DEFAULT 0 NOT NULL
);

CREATE TABLE pronostics (
  id INTEGER PRIMARY KEY,
  wilderId INTEGER,
  matchId INTEGER,
  pronoTeamHome INTEGER,
  pronoTeamOut INTEGER,
  FOREIGN KEY(wilderId) REFERENCES wilders(id),
  FOREIGN KEY(matchId) REFERENCES matchs(id)
);


-- Down

DROP TABLE pronostics;
DROP TABLE matchs;
DROP TABLE wilders;
