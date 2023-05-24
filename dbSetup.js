const sqlite3 = require('sqlite3').verbose()

function dbSetup() {
  let db = new sqlite3.Database("todo.sqlite");
  db.run(`PRAGMA foreign_keys = ON`);
  
  db.run(
    `CREATE TABLE user
    (email_address VARCHAR(30) PRIMARY KEY, 
    first_name VARCHAR(15), 
    last_name VARCHAR(15), 
    notification_ind CHAR(1)
    )`);


  db.close()
}

dbSetup()