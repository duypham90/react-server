
const mysql = require('mysql');

const poolMysql = mysql.createPool({
  connectionLimit: 1,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'yii2-shop',
  connectTimeout: 1000,
  debug: false,
  charset : 'utf8mb4'
});


function queryDB2(sql, arrData, cb) {
  poolMysql.getConnection((errConnect, connection) => {
    console.log(` connected as id ${connection.threadId}`);
    if (errConnect) return cb(`${errConnect}`);
    connection.query(sql, arrData, (errQuery, result) => {
      connection.release();
      if (errQuery) return cb(`${errQuery}`);
      cb(undefined, result);
    });
  });
}

const dbMYSQL = (sql, arrData) => (
  new Promise((resolve, reject) => {
     poolMysql.getConnection((errConnect, connection) => {
      if (errConnect) return reject(errConnect);
      connection.query(sql, arrData, (errQuery, result) => {
        connection.release();
        if (errQuery) return reject(errQuery);
        return resolve(result);
      });
    });
  })
)
function getList(){
  return dbMYSQL('select * from products ORDER BY id DESC limit 10')
  .then(result => result)
}
function insertProduct(product) {
  const sql = `INSERT INTO products (name) VALUES (?)`;
  return dbMYSQL(sql, [product])
  .then(rows => getProductById(rows.insertId));
}
function getProductById(id) {
  return dbMYSQL('select name from products where id = ?', [id]).then(result => result);
}
//getProductById(6587).then(res => console.log(res));
// dbMYSQL('select * from products limit 10', [])
// .then(result => console.log(result))
// .catch(err =>  console.log(err));
//insertProduct('abs').then(res => console.log(res));
module.exports = { getList, insertProduct };
//queryDB2('SELECT * from  products limit 1', (err, result) => console.log(result));
//addNew('news', 'khoa hoc node js','Trunm', 'abc.jpg', '12-3-2017',result =>console.log(result));
//getNewsById(3, result => console.log(result));

