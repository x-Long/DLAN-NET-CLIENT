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
  // table_name=sql.split(" ")[2]
  // conn.query("truncate"+table_name)

  conn.query(sql, post, function (err, results) {
    callback(err, JSON.stringify(results));
  });
}


handleDisconnect()

module.exports = {
  query_db: query_db,
  insert_db: insert_db
}

// create database dlan;
// use dlan;

// CREATE TABLE IF NOT EXISTS `network_info`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `mac` VARCHAR(100) NOT NULL,
//     `ip` VARCHAR(40) NOT NULL,
//     `name` VARCHAR(40) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;


// CREATE TABLE IF NOT EXISTS `computer_base_info`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `pc_type` VARCHAR(50) NOT NULL,
//     `pc_name` VARCHAR(50) NOT NULL,
//     `mother_board_model` VARCHAR(100) NOT NULL,
//     `cd_drive` VARCHAR(50) NOT NULL,
//     `has_mac_changed` VARCHAR(50) NOT NULL,
//     `ram_info` VARCHAR(50) NOT NULL,
//     `processor_info` VARCHAR(50) NOT NULL,
//     `os_install_time` VARCHAR(50) NOT NULL,
//     `os_type` VARCHAR(50) NOT NULL,
//     `user` VARCHAR(50) NOT NULL,
//     `ip` VARCHAR(50) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;

// CREATE TABLE IF NOT EXISTS `harddisks_info`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `model` VARCHAR(50) NOT NULL,
//     `serials` VARCHAR(50) NOT NULL,
//     `capacity` VARCHAR(100) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;

// CREATE TABLE IF NOT EXISTS `all_usb_info`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
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

// CREATE TABLE IF NOT EXISTS `usb_storage_info`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
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

// CREATE TABLE IF NOT EXISTS `all_software_records`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `name` VARCHAR(50) NOT NULL,
//     `version` VARCHAR(50) NOT NULL,
//     `publisher` VARCHAR(50) NOT NULL,
//     `install_path` VARCHAR(100) NOT NULL,
//     `install_date` VARCHAR(50) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;


// CREATE TABLE IF NOT EXISTS `internet_tool_records`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `name` VARCHAR(50) NOT NULL,
//     `version` VARCHAR(50) NOT NULL,
//     `publisher` VARCHAR(50) NOT NULL,
//     `install_path` VARCHAR(100) NOT NULL,
//     `install_date` VARCHAR(50) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;


// CREATE TABLE IF NOT EXISTS `all_browser_records`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `time` VARCHAR(50) NOT NULL,
//     `title` VARCHAR(50) NOT NULL,
//     `url` VARCHAR(100) NOT NULL,
//     `browser_name` VARCHAR(100) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;


// CREATE TABLE IF NOT EXISTS `sharing_settings_records`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `name` VARCHAR(50) NOT NULL,
//     `path` VARCHAR(50) NOT NULL,
//     `description` VARCHAR(100) NOT NULL,
//     `notify` VARCHAR(100) NOT NULL,
//     `deduction` VARCHAR(100) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;


// CREATE TABLE IF NOT EXISTS `updates_patch_records`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `date` VARCHAR(50) NOT NULL,
//     `kb_num` VARCHAR(50) NOT NULL,
//     `url` VARCHAR(100) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;


// CREATE TABLE IF NOT EXISTS `cloud_disk_records`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `file_name` VARCHAR(200) NOT NULL,
//     `file_size` VARCHAR(50) NOT NULL,
//     `modify_time` VARCHAR(50) NOT NULL,
//     `net_tool` VARCHAR(50) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;


// CREATE TABLE IF NOT EXISTS `message_tool_records`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `tool` VARCHAR(50) NOT NULL,
//     `record` VARCHAR(50) NOT NULL,
//     `user` VARCHAR(50) NOT NULL,
//     `access_time` VARCHAR(50) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;


// CREATE TABLE IF NOT EXISTS `list_wireless_device`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `name` VARCHAR(50) NOT NULL,
//     `type` VARCHAR(50) NOT NULL,
//     `notify` VARCHAR(50) NOT NULL,
//     `deduction` VARCHAR(50) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;

// CREATE TABLE IF NOT EXISTS `file_access_records`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `file_name` VARCHAR(50) NOT NULL,
//     `file_path` VARCHAR(300) NOT NULL,
//     `is_exists` VARCHAR(50) NOT NULL,
//     `access_time` VARCHAR(50) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;


// CREATE TABLE IF NOT EXISTS `virtual_machine_software_records`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `name` VARCHAR(50) NOT NULL,
//     `version` VARCHAR(50) NOT NULL,
//     `publisher` VARCHAR(50) NOT NULL,
//     `install_path` VARCHAR(50) NOT NULL,
//     `install_date` VARCHAR(50) NOT NULL,
//     `notify` VARCHAR(50) NOT NULL,
//     `deduction` VARCHAR(100) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;


// CREATE TABLE IF NOT EXISTS `services_records`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `name` VARCHAR(50) NOT NULL,
//     `display_name` VARCHAR(50) NOT NULL,
//     `start_type` VARCHAR(50) NOT NULL,
//     `process_id` VARCHAR(50) NOT NULL,
//     `file_path` VARCHAR(300) NOT NULL,
//     `status` VARCHAR(50) NOT NULL,
//     `is_system_service` VARCHAR(50) NOT NULL,
//     `is_signed` VARCHAR(100) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;



// CREATE TABLE IF NOT EXISTS `current_network_records`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `protocol` VARCHAR(50) NOT NULL,
//     `local_ip` VARCHAR(50) NOT NULL,
//     `local_port` VARCHAR(50) NOT NULL,
//     `remote_ip` VARCHAR(50) NOT NULL,
//     `remote_port` VARCHAR(300) NOT NULL,
//     `program_path` VARCHAR(50) NOT NULL,
//     `status` VARCHAR(50) NOT NULL,
//     `process_name` VARCHAR(100) NOT NULL,
//     `pid` VARCHAR(50) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;

// CREATE TABLE IF NOT EXISTS `account_setting`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `Event` VARCHAR(50) NOT NULL,
//     `Login` VARCHAR(50) NOT NULL,
//     `Object` VARCHAR(50) NOT NULL,
//     `SpecialUse` VARCHAR(50) NOT NULL,
//     `Modify` VARCHAR(300) NOT NULL,
//     `Account` VARCHAR(50) NOT NULL,
//     `Process` VARCHAR(50) NOT NULL,
//     `AD` VARCHAR(100) NOT NULL,
//     `LoginOther` VARCHAR(50) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;

// CREATE TABLE IF NOT EXISTS `account_permission_setting`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `PermissionPrompt` VARCHAR(50) NOT NULL,
//     `UserName` VARCHAR(50) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;

// CREATE TABLE IF NOT EXISTS `account_strategy`(
//     `id` INT UNSIGNED AUTO_INCREMENT,
//     `task_id` INT NOT NULL,
//     `MinValidityPeriod` VARCHAR(50) NOT NULL,
//     `MaxValidityPeriod` VARCHAR(50) NOT NULL,
//     `MinPasswordLength` VARCHAR(50) NOT NULL,
//     `PasswordHistory` VARCHAR(50) NOT NULL,
//     `LockThreshold` VARCHAR(300) NOT NULL,
//     `GuestStatus` VARCHAR(50) NOT NULL,
//     `LockTime` VARCHAR(50) NOT NULL,
//     `RestCounter` VARCHAR(100) NOT NULL,
//     PRIMARY KEY ( `id` )
//  )ENGINE=InnoDB DEFAULT CHARSET=utf8;




// truncate TABLE dlan.all_browser_records;                   
// truncate TABLE dlan.all_software_records;                  
// truncate TABLE dlan.all_usb_info;                          
// truncate TABLE dlan.cloud_disk_records;                    
// truncate TABLE dlan.current_network_records;               
// truncate TABLE dlan.file_access_records;                  
// truncate TABLE dlan.internet_tool_records;                 
// truncate TABLE dlan.list_wireless_device;                  
// truncate TABLE dlan.message_tool_records;                  
// truncate TABLE dlan.network_info;                          
// truncate TABLE dlan.services_records;                      
// truncate TABLE dlan.sharing_settings_records;             
// truncate TABLE dlan.updates_patch_records;                
// truncate TABLE dlan.usb_storage_info;                      
// truncate TABLE dlan.virtual_machine_software_records;
// truncate TABLE dlan.computer_base_info;
// truncate TABLE dlan.harddisks_info;