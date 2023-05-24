var sqlite3 = require('sqlite3').verbose()

class Aggregates {
  constructor(database="todo.sqlite") {
    this.db = new sqlite3.Database(database);
  }

 totalUsers()  {
    return new Promise((resolve, reject) => {
            this.db.all(
              `SELECT COUNT (*) FROM user AS total_users`,
              (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

}


module.exports = Aggregates