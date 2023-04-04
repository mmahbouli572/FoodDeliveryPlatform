const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Okokok123.',
    database: 'fooddelivery'
  });

  pool.query('SELECT * FROM users WHERE id = ?', [1], (error, results) => {
    if (error) throw error;
    console.log(results);
  });

pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', ['Amen', 'mohamedamenallahm@gmail.com', 'Okokok123.'], (error, results) => {
    if (error) throw error;
    console.log(results);
});

  pool.on('error', (error) => {
    console.error('Database error:', error);
  });
  passport.use(new LocalStrategy(
    function(username, password, done) {
      db.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
        if (error) { return done(error); }
        if (!results.length) { return done(null, false, { message: 'Incorrect username.' }); }
        if (password !== results[0].password) { return done(null, false, { message: 'Incorrect password.' }); }
        return done(null, results[0]);
      });
    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    db.query('SELECT * FROM users WHERE id = ?', [id], function (error, results, fields) {
      if (error) { return done(error); }
      done(null, results[0]);
    });
  });
      