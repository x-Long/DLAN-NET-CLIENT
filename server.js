var express = require('express')
var db = require('./models/db.js')

var bodyParser = require('body-parser');
var fs = require('fs')
var app = express()

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
    "/client/report/network_info": "network_info",
    "/client/report/usb_flash_records": "all_usb_info",
    // "/client/report/pc_base_info": " ",
}

// 数据上传接口，利用 url 反向解析
app.post('/client/report/*', function (req, res) {
    
    console.log(req.body)
    for (i in req.body) {
        db.insert_db(`insert into ${db_table_name_map[req.path]} set ? `, req.body[i], function (err, results) {
            if (err) {
                console.log('insert error', err);
            } else {
                results = JSON.parse(results)
                console.log("insertId:", results.insertId)
            }
        });
    }
    res.send("upload success")
})


// 数据读取接口，利用 url 反向解析
app.get('/client/report/*', function (req, res) {

    db.query_db(`select * from ${db_table_name_map[req.path]}`, function (err, results) {
        results = JSON.parse(results)
        console.log(results)
        res.send(results)
    });

})


// 假数据，供前端测试使用
app.post('/get_usb_info', function (req, res) {

    var usb_info = [{
        'name': 'USB Composite Device',
        'service': 'usbccgp',
        'serials': 'CN73A280MD065W',
        'last_plugin_time': '2021-02-02 14:06:19',
        'description': 'USB Composite Device',
        'VID': '03f0',
        'PID': 'df11',
        'manufacture': 'HP, Inc',
        'first_plugin_time': '2021-02-02 14:06:19',
        'deduction': '---'
    }, {
        'name': 'USB Printing Support',
        'service': 'usbprint',
        'serials': '7&4347858&0&0000',
        'last_plugin_time': '2021-02-02 14:06:19',
        'description': 'USB Printing Support',
        'VID': '03f0',
        'PID': 'df11',
        'manufacture': 'HP, Inc',
        'first_plugin_time': '2021-02-02 14:06:19',
        'deduction': '---'
    }, {
        'name': 'DeskJet 1110 series',
        'service': 'WINUSB',
        'serials': '7&4347858&0&0001',
        'last_plugin_time': '2021-02-02 14:04:13',
        'description': 'WinUsb Device',
        'VID': '03f0',
        'PID': 'df11',
        'manufacture': 'HP, Inc',
        'first_plugin_time': '2021-02-02 14:04:13',
        'deduction': '---'
    }];
    res.send(JSON.stringify(usb_info))
})

app.post('/get_computer_base_info', function (req, res) {

    var computer_base_info = {
        'user': 'long',
        'ip': '192.168.1.23',
        'pc_type': 'Windows-10-10.0.19041-SP0',
        'pc_name': 'LAPTOP-U3RP2QMO',
        'ram_info': '总共: 14 GB (13.9 GB 可用)',
        'processor_info': 'AMD64 Family 23 Model 96 Stepping 1, AuthenticAMD',
        'os_install_time': '2020-11-12 22:37:24',
        'os_type': '实体主机系统'
    };
    res.send(JSON.stringify(computer_base_info))
})


app.post('/get_network_info', function (req, res) {

    var network_info = [{
        'mac': '00:50:56:C0:00:01',
        'ip': '192.168.85.1',
        'name': 'VMware Network Adapter VMnet1'
    }, {
        'mac': '00:50:56:C0:00:08',
        'ip': '192.168.126.1',
        'name': 'VMware Network Adapter VMnet8'
    }, {
        'mac': '34:C9:3D:EC:52:1B',
        'ip': '192.168.3.59',
        'name': 'WLAN'
    }];
    res.send(JSON.stringify(network_info))
})



app.listen(PORT, "0.0.0.0", function () {
    console.log('server is running at port ' + PORT)
})