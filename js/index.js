var vm = new Vue({
    el: '#app',
    data: {
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
        computer_base_info: {},
        network_info: [],
        usb_info: []
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
        get_network_info(e) {

            button = e.currentTarget
            button.innerHTML = "正在查询..."
            this.$http.post('/get_network_info').then(result => {
                console.log("the post result is:", result)
                var content = result.body
                this.network_info = content
            }).then(button.innerHTML = "查询记录")
        },
        get_usb_info(e) {

            button = e.currentTarget
            button.innerHTML = "正在查询..."
            this.$http.post('/get_usb_info').then(result => {
                console.log("the post result is:", result)
                var content = result.body
                this.usb_info = content
            }).then(button.innerHTML = "查询记录")

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
        $("#computer_base_info_container p button").click()
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