// Định nghĩa lớp đối tượng Staff
function Staff(account, name, mail, pass, date, salary, position, workingHour) {
  this.account = account;
  this.name = name;
  this.mail = mail;
  this.pass = pass;
  this.date = date;
  this.salary = salary;
  this.position = position;
  this.workingHour = workingHour;
}
// Thêm hàm tính tổng lương vào đối tượng Staff
Staff.prototype.salaryCal = function () {
  switch (this.position) {
    case "Sếp":
      return this.salary * 3;
      break;
    case "Trưởng phòng":
      return this.salary * 2;
      break;
    case "Nhân viên":
      return this.salary;
      break;
    default:
      return 0
  }
};

// Thêm hàm sắp xếp loại nhân viên vào đối tượng Staff
Staff.prototype.ranking = function () {
  if (this.workingHour >= 192) {
    return "Nhân viên xuất sắc";
  } else if (this.workingHour >= 176) {
    return "Nhân viên giỏi";
  } else if (this.workingHour >= 160) {
    return "Nhân viên khá";
  } else {
    return "Nhân viên trung bình";
  }
};

// Khai báo mảng rỗng staff
var staffs = [];

init();
function init() {
  //  Lấy data từ localStorage
  staffs = JSON.parse(localStorage.getItem("staffs")) || [];

  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];

    staffs[i] = new Staff(
      staff.account,
      staff.name,
      staff.mail,
      staff.pass,
      staff.date,
      staff.salary,
      staff.position,
      staff.workingHour,
    );
  }
  // Hiển thị ra giao diện
  display(staffs);
}


// Hàm thêm thông tin nhân viên
function addStaff() {
  // DOM giá trị nhập
  var account = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var mail = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workingHour = +document.getElementById("gioLam").value;

  // Khởi tạo object
  var staff = new Staff(
    account,
    name,
    mail,
    pass,
    date,
    salary,
    position,
    workingHour
  );

  // Thêm object vừa tạo vào mảng staffs
  staffs.push(staff);

  // Lưu xuống localstorage
  localStorage.setItem("staffs", JSON.stringify(staffs))
  display(staffs);
  resetForm();
}

// Hàm hiển thị
function display(staffs) {
  var tbody = document.getElementById("tableDanhSach");
  var html = "";

  // Thêm các giá trị hiển thị trên bảng
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    html += `
        <tr>
            <td> ${staff.account} </td>
            <td> ${staff.name} </td>
            <td> ${staff.mail} </td>
            <td> ${staff.date} </td>
            <td> ${staff.position} </td>
            <td> ${staff.salaryCal()} </td>
            <td> ${staff.ranking()} </td>
            <td> 
              <button 
              class="btn btn-primary mt-1" 
              data-toggle="modal" 
              data-target="#myModal" 
              onclick="selectStaff('${staff.account}')"
              > 
              Cập nhật 
              </button>
              <button 
              class="btn btn-danger mt-1" 
              onclick="deleteStaff('${staff.account}')"
              > 
              Xóa 
              </button>
            </td>
        </tr>
        `;
  }
  tbody.innerHTML = html;
}

// Hàm reset
function resetForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = getToday();
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "Chọn chức vụ";
  document.getElementById("gioLam").value = "";

  document.getElementById("tknv").disabled = false
  document.getElementById("btnThemNV").disabled = false
}

// Hàm lấy giá trị ngày hôm nay
function getToday() {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + (month + 1);
  }
  var date = month + "/" + day + "/" + today.getFullYear();

  return date;
}

// Hàm cập nhật nhân viên lên popup nhập giá trị
function selectStaff(staffAccount) {
  // Dùng staffAccount để tìm ra nhân viên muốn cập nhật
  var index = findStaff(staffAccount);
  // Lấy ra staff muốn cập nhật từ mảng staffs
  var staff = staffs[index];
  // Hiển thị lên giao diện
  document.getElementById("tknv").value = staff.account;
  document.getElementById("name").value = staff.name;
  document.getElementById("email").value = staff.mail;
  document.getElementById("password").value = staff.pass;
  document.getElementById("datepicker").value = staff.date;
  document.getElementById("luongCB").value = staff.salary;
  document.getElementById("chucvu").value = staff.position;
  document.getElementById("gioLam").value = staff.workingHour;

  document.getElementById("tknv").disabled = true
  document.getElementById("btnThemNV").disabled = true
}

// Hàm tìm nhân viên theo tài khoản
function findStaff(staffAccount) {
  var index = -1;
  for (var i = 0; i < staffs.length; i++) {
    // Kiếm phần tử staff trong mảng nào có id khớp với staffAccount
    if (staffs[i].account === staffAccount) {
      index = i;
      break;
    }
  }
  return index;
}


// Hàm update nhân viên lên giao diện
function updateStaff() {
  // DOM lấy giá trị
  var account = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var mail = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var workingHour = +document.getElementById("gioLam").value;

  // Khởi tạo object
  var staff = new Staff(
    account,
    name,
    mail,
    pass,
    date,
    salary,
    position,
    workingHour
  );

  // Cập nhật thông tin staff đã update
  // Tìm nhân viên update
  var index = findStaff(staff.account);
  // Cập nhật
  staffs[index] = staff;

  document.getElementById("tknv").disabled = true
  document.getElementById("btnThemNV").disabled = true

  // Cập nhật lên localstorage
  localStorage.setItem("staffs", JSON.stringify(staffs))

  // Hiển thị lên giao diện
  display(staffs);
  resetForm();
}


// Hàm xóa nhân viên
function deleteStaff(staffAccount) {
  // Xác định nhân viên qua account
  var index = findStaff(staffAccount);

  // Nếu tồn tại thì xóa
  if (index !== -1) {
    staffs.splice(index, 1);
  }

 // Cập nhật lên localstorage
  localStorage.setItem("staffs", JSON.stringify(staffs))

  // Hiển thị lại giao diện
  display(staffs);
}
