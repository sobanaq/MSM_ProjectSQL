// const { rejects } = require('assert');
// const { resolve } = require('dns');

const sqlite3 = require('sqlite3').verbose()



class SQL {

  constructor(database="todo.sqlite") {
    this.db = new sqlite3.Database(database);
  }

  insertUser(emailAddress, firstName, lastName, notificationInd) {
    this.db.run(`
    INSERT INTO user (
    email_address, 
    first_Name, 
    last_Name, 
    notification_ind
    )
    VALUES (?, ?, ?, ?)
    `,  [emailAddress, firstName, lastName, notificationInd])
    }



  
  updateTodo(title, content, priority, todoId) {
    this.db.run(`
    UPDATE todo 
    SET
      title = ?,
      content = ?,
      priority = ?
    WHERE
      todo_id = ?
    `,  [title, content, priority, todoId])
    }
  
  

  removeUser(emailAddress) {
    return new Promise ((resolve, reject) => {
      this.db.run(`DELETE FROM user 
      WHERE email_Address = ? `,
      [emailAddress],
      function (err) {
        if (err) { 
          reject(err);
        }
        resolve();
      });
  });
}

  
}
    

module.exports = SQL;