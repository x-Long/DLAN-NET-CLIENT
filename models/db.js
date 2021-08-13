var mysql = require("mysql");

var conn;
var db_conf = {
  host: 'localhost',
  post: '3306',
  user: 'root',
  password: '123456',
  database: 'dlan'
}


function handleDisconnect() {
  conn = mysql.createConnection(db_conf);
  conn.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  conn.on('error', function (err) {
    console.log('db error', err);
    if (err.code = 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}


function query_db(sql, callback) {

  var dataStr = "";
  conn.query(sql, function (err, results) {
    if (results) {
      dataStr = JSON.stringify(results)
    }
    callback(err, dataStr);
  });
}

function insert_db(sql, post, callback) {

  conn.query(sql, post, function (err, results) {
    console.log(post)
    callback(err, JSON.stringify(results));
  });
}


handleDisconnect()

module.exports = {
  query_db: query_db,
  insert_db: insert_db
}


// CREATE TABLE IF NOT EXISTS `network_info`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `mac` VARCHAR(100) NOT NULL,
//     `ip` VARCHAR(40) NOT NULL,
//     `name` VARCHAR(40) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;

// CREATE TABLE IF NOT EXISTS `all_usb_info`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `name` VARCHAR(50) NOT NULL,
//     `service` VARCHAR(50) NOT NULL,
//     `serials` VARCHAR(100) NOT NULL,
//     `last_plugin_time` VARCHAR(50) NOT NULL,
//     `description` VARCHAR(50) NOT NULL,
//     `VID` VARCHAR(50) NOT NULL,
//     `PID` VARCHAR(50) NOT NULL,
//     `manufacture` VARCHAR(50) NOT NULL,
//     `first_plugin_time` VARCHAR(50) NOT NULL,
//     `deduction` VARCHAR(50) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;