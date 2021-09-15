var express = require('express')

var db = require('./models/db.js')

var bodyParser = require('body-parser');
var fs = require('fs')
var app = express()

app.use(express.json({
    limit: '1000mb'
}));
app.use(express.urlencoded({
    limit: '1000mb',
    extended: true
}));

app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', express.static('./'))
app.use('/lib', express.static('./lib'))

const PORT = 3389

var db_table_name_map = {

    "/client/report/computer_base_info": "computer_base_info",
    "/client/report/network_info": "network_info",
    "/client/report/harddisks_info": "harddisks_info",
    "/client/report/all_usb_info": "all_usb_info",
    "/client/report/usb_storage_info": "usb_storage_info",
    "/client/report/all_software_records": "all_software_records",
    "/client/report/all_browser_records": "all_browser_records",
    "/client/report/internet_tool_records": "internet_tool_records",
    "/client/report/sharing_settings_records": "sharing_settings_records",
    "/client/report/updates_patch_records": "updates_patch_records",
    "/client/report/cloud_disk_records": "cloud_disk_records",
    "/client/report/message_tool_records": "message_tool_records",
    "/client/report/list_wireless_device": "list_wireless_device",
    "/client/report/virtual_machine_software_records": "virtual_machine_software_records",
    "/client/report/services_records": "services_records",
    "/client/report/current_network_records": "current_network_records",
    "/client/report/file_access_records": "file_access_records",
    "/client/report/account_setting": "account_setting", //审计策略
    "/client/report/account_permission_setting": "account_permission_setting", //系统权限
    "/client/report/account_strategy": "account_strategy", // 安全策略

}



// 数据上传接口，利用 url 反向解析
app.post('/client/report/*', function (req, res) {

    for (i in req.body) {
        db.insert_db(`insert into ${db_table_name_map[req.path]} set ? `, req.body[i], function (err, results) {
            if (err) {
                console.log('insert error', err);
            } else {
                results = JSON.parse(results)
                console.log(`insert into ${db_table_name_map[req.path]} `)
                console.log("insertId:", results.insertId)
            }
        });
    }
    res.send("upload success")

})

app.get('/client/detail/', function (req, res) {
    res.redirect('/?task_id=' + req.query.task_id)
})


// 数据读取接口，利用 url 反向解析
app.get('/client/report/*', function (req, res) {
    console.log(req.query)
    db.query_db(`select * from ${db_table_name_map[req.path]} where task_id=${req.query.task_id}`, function (err, results) {
        console.log(`select * from ${db_table_name_map[req.path]}`)
        if (err) {
            console.log('insert error', err);
        } else {
            results = JSON.parse(results)
            // console.log(results)
            res.send(results)
        }
    });

})


app.listen(PORT, "0.0.0.0", function () {
    console.log('server is running at port ' + PORT)
})