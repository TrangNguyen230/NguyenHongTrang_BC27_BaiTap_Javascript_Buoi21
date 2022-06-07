// Khai báo mảng rỗng staff
var staffs = [];

// Hàm DOM lấy giá trị nhập
function getData() {
  //B1: DOM giá trị nhập
  var account = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var mail = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workingHour = document.getElementById("gioLam").value;

  return;
}

// Hàm thêm thông tin nhân viên
function addStaff() {
  getData();

  // Khai báo object
  for(var i = 0; i < staffs.length; i++) {
      var staff = staffs[i]
      staffs[i] = new Staff(
        staff.account,
        staff.name,
        staff.mail,
        staff.pass,
        staff.date,
        staff.salary,
        staff.position,
        staff.workingHour,
      )
  }

  // Thêm object vừa tạo vào mảng staffs
  staffs.push(staff);

  display(staffs)
}

function salaryCal(salary, position) {
  var salaryTotal = 0;
  switch (position) {
    case "Sếp":
      salaryTotal = salary * 3;
      break;
    case "Trưởng phòng":
      salaryTotal = salary * 2;
      break;
    case "Nhân viên":
      salaryTotal = salary;
      break;
    default:
  }
  
  return salaryTotal
}

function display(staffs) {
  var tbody = document.getElementById("tableDanhSach");
  var html = "";

  // Thêm các giá trị hiển thị trên bảng
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    console.log(staffs)
    html += `
        <tr>
            <td> ${staff.account} </td>
            <td> ${staff.name} </td>
            <td> ${staff.mail} </td>
            <td> ${staff.date} </td>
            <td> ${staff.position} </td>
            <td> ${salaryCal(salary, position)} </td>

        `;
  }
  tbody.innerHTML = html
}
