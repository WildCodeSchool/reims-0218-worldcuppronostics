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
