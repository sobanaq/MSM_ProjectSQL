const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');

const SQL = require('./dbHelperFunction');
const Aggregates = require('./aggregates')

// Boilerplate

const app = express();
const sql = new SQL()

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({
    extended: false
}));


// HOME PAGE

app.get('/', (req, res) => {
    res.render('index');
})


// USER SIGNUP

app.get('/user_signup', (req, res) => {
    res.render('user_signup');
})

app.post('/user_signup', (req, res) => {

  let email = req.body.email;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let notificationInd = req.body.notifSettings

  sql.insertUser(email, firstName, lastName, notificationInd)

  res.redirect('/');
});



// REMOVE USER

app.get('/remove_user', (req, res) => {
    res.render('remove_user');
})

app.post('/remove_user', (req, res) => {
  let email = req.body.email;
  sql.removeUser(email)
  res.redirect('/');
});


// VIEW AGGREGATES

app.get('/view_aggs', async (req, res) => {
    let aggs = new Aggregates
    Promise.all([
      aggs.totalUsers(),
      aggs.totalTodos(),
      aggs.todosPerUser(),
      aggs.todosPerPriority(),
      aggs.maxTodos(),
      aggs.emailOfMaxTodos(),
      aggs.minTodos(),
      aggs.emailOfMinTodos()
                ]).then((
                [totalUsers,
                 totalTodos,
                 todosPerUser,
                 todosPerPriority,
                 maxTodos,
                 emailOfMaxTodos,
                 minTodos,
                 emailOfMinTodos
                ]) => {
  res.render('view_aggs', {
      'totalUsers': JSON.stringify(totalUsers),
    })
    }
               )
})

app.listen(3000, () => {
  console.log(`App listening on port 4000`)
})