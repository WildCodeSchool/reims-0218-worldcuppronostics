-- Up
CREATE TABLE matchs (
  id INTEGER PRIMARY KEY,
  teamhome VARCHAR(50),
  teamout VARCHAR(50),
  scoreteamhome INT,
  scoreteamout INT,
  hours DATE,
  localisation VARCHAR(50)
);

-- Down
DROP TABLE matchs;
