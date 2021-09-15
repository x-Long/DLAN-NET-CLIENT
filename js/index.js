var vm = new Vue({
    el: '#app',
    data: {
        request_path_suffix: "/client/report/",
        date: "",
        base_info: {
            'secret_level': '秘密级',
            'area': '陕西,西安,新城区',
            'unit_own': '地方',
            'checked_unit': '西安帝岚',
            'checked_room': '2301',
            'checked_person': '梁小龙',
            'check_person': '梁小龙',
            'comment': '测试节点'
        },
        computer_base_info: [{}],
        network_info: [],
        harddisks_info: [],
        all_usb_info: [],
        usb_storage_info: [],
        all_software_records: [],
        all_browser_records: [],
        internet_tool_records: [],
        sharing_settings_records: [],
        updates_patch_records: [],
        cloud_disk_records: [],
        message_tool_records: [],
        list_wireless_device: [],
        virtual_machine_software_records: [],
        services_records: [],
        current_network_records: [],
        file_access_records: [],

        account_setting: [],
        account_permission_setting: [],
        account_strategy: [],
        progress_value: 0,
        has_checked: []

    },
    methods: {
        choose_all(e) {
            check_box = e.currentTarget
            table_row = $(check_box).parent().parent()
            if ($(check_box).prop('checked')) {
                table_row.parent().find("input[type=checkbox]").prop("checked", true)
                table_row.parent().find("input[type=checkbox]").parent().parent().addClass("illeal");
                table_row.removeClass("illeal");
            } else {
                table_row.parent().find("input[type=checkbox]").prop("checked", false)
                table_row.parent().find("input[type=checkbox]").parent().parent().removeClass("illeal");
            }
        },
        state_change(e) {
            check_box = e.currentTarget
            table_row = $(check_box).parent().parent()
            if ($(check_box).prop('checked')) {
                table_row.addClass("illeal");
            } else {
                table_row.removeClass("illeal");
            }
        },
        toggle_visible(id) {
            var x = document.getElementById(id);
            if (x.style.display === "none") {
                x.style.display = "table";
            } else {
                x.style.display = "none";
            }
        },
        toogle_all_visible(e) {

            command = e.currentTarget
            if (command.value == "显示所有") {
                table_list = Array.from($("#app div table"))
                table_list.forEach((item) => {
                    item.style.display = "table"
                })
                command.value = "隐藏所有"

            } else {
                table_list = Array.from($("#app div table"))
                table_list.forEach((item) => {
                    item.style.display = "none"
                })
                command.value = "显示所有"
            }
        },
        get_date() {
            var d = new Date();

            this.date = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
        },
        get_computer_base_info(e) {
            button = e.currentTarget
            button.innerHTML = "正在查询..."
            this.$http.post('/get_computer_base_info').then(result => {
                console.log("the post result is:", result)
                var content = result.body
                this.computer_base_info = content
            }).then(button.innerHTML = "查询记录")
        },
        get_info(e, check_item) {
            
            button = e.currentTarget
            button.innerHTML = "正在查询..."
            console.log(this.getQueryVariable("task_id"))
            // this.$http.post('/get_network_info').then(result => {
            this.$http.get(this.request_path_suffix + check_item, {
                params: {
                    task_id: parseInt(this.getQueryVariable("task_id"))
                }
            }).then(result => {
                // console.log("the post result is:", result)
                var content = result.body
                this[check_item] = content
                if (!this.has_checked.includes(check_item)) {
                    this.progress_value = this.progress_value + 5
                    $("progress").attr("value", this.progress_value)
                    console.log(this.progress_value)
                }
                this.has_checked.push(check_item)
            }).then(button.innerHTML = "查询记录")
        },
        getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return (false);
        },
        get_all_info(e) {
            query_all = e.currentTarget
            query_all.innerHTML = "正在查询..."
            $("#app div p button").click().then(query_all.innerHTML = "查询所有")
        },
        generate_pdf() {
            window.print()
        }
    },
    created: function () {
        this.get_date()
    },
    mounted: function () {
        $("#start_all").click()
    }
});

// var mytable = document.getElementById("item_result_table");
// for (var i = 0, rows = mytable.rows.length; i < rows; i++) {
//     for (var j = 0, cells = mytable.rows[i].cells.length; j < cells; j++) {
//         data = mytable.rows[i].cells[j].innerHTML;

//         if (i % 2 != 1 && i != 0) {
//             mytable.rows[i].classList.add("even-color");
//         }

//         if (data.slice(0, 2) == "违规" && i != 0) {
//             mytable.rows[i].classList.add("illeal");
//         }
//     }
// }