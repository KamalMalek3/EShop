const mysql = require('mysql');

const con = mysql.createConnection({
  host: '127.0.0.1',  // The hostname of your MySQL server 127.0.0.1 or localhost
  user: 'root',       // Your MySQL username
  password: '',   // Your MySQL password (empty string for no password)
  database: 'webdb',  // The name of your MySQL database
});

con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = con;