const { faker } = require('@faker-js/faker');
var mysql = require('mysql2');

function generateAddress() {
  console.log(faker.address.streetAddress());
  console.log(faker.address.city());
  console.log(faker.address.state());
}

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ,
  database: 'join_us'
});

con.connect();
//  selecting data
// con.query('SELECT COUNT(*) as total FROM users ', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });
//  inserting data
var data = []
for (let index = 0; index < 500; index++) {
  data.push([faker.internet.email() ,faker.date.past()])
}
con.query('INSERT INTO users (email, created_at) VALUES ?', [data], function (error, results, fields) {
  if (error) throw error;
});
con.query('SELECT * FROM users', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
con.end();