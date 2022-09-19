window.addEventListener("load", function () {
    // click chuột bên ngoài block signup thì đóng giao diện signup
    // window.onclick = function (event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";
    //   }
    // };
  
    // Click để ẩn hiện mật khẩu
    function daoTT() {
      var mk = document.getElementById("mk");
      mk.type = mk.type === "password" ? "text" : "password";
    }
  
    const modal = document.getElementById("modal-signup");
  });

  function showConfirm() {
    document.getElementById("modal-confirm").style.display = "block";
  }
  
  function hideConfirm() {
    document.getElementById("modal-confirm").style.display = "none";
  }
  // var linkLogin = link("http://127.0.0.1:5501/login.html");

  function myFunctionin() {
  }
  function myfunctionup() {
    document.getElementById("modal-signup").style.display = "flex";
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function renderListAccount(){
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];

    // if (accounts.length===0){
    //     document.getElementById("container-list-account").style.display = "none";
    //     return false;
    // }
    // else{
    //     document.getElementById("container-list-account").style.display = "block";
    // }

    let tableContent = `<tr>
        <td>#</td>
        <td>Họ và tên</td>
        <td>Địa chỉ email</td>
        <td>Mật khẩu</td>
        <td>Hành động</td>
      </tr>`;

    accounts.forEach((account, index) => {
        let accountId = index;
        index ++;

        tableContent += `<tr>
        <td>${index}</td>
        <td>${account.fullname}</td>
        <td>${account.emailsignup}</td>
        <td>${account.passwordsignup}</td>
        <td>
            <a href="#" onclick='editAccount(${accountId})'>Sửa</a> | <a href="#" onclick='deleteAccount(${accountId})'>Xóa</a>
            </td>
            </tr>`;
            
            
          });
          
          document.getElementById("list-accounts").innerHTML = tableContent;
        }
        
        
        // <a href="#" onclick='editAccount(${accountId})'>Sửa</a> | <a href="#" onclick='deleteAccount(${accountId})'>Xóa</a>
function resetInputSignup() {
  document.getElementById('fullname').value="";
  document.getElementById('emailsignup').value="";
  document.getElementById('passwordsignup').value="";
  document.getElementById('password_confirmation').value="";
}
function resetInputLogin() {
  document.getElementById('email-login').value="";
  document.getElementById('password-login').value="";
}

function deleteAccount(id){
  let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
  if(confirm("Bạn có chắc chắn muốn xóa?")){
    accounts.splice(id,1)
  }
  localStorage.setItem("accounts", JSON.stringify(accounts));
  renderListAccount();
  document.getElementById("modal-confirm").style.display = "none";
}


function editAccount(index) {
  let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
  document.getElementById("fullnameedit").value = accounts[index].fullname;
  document.getElementById("emailedit").value = accounts[index].emailsignup;
  document.getElementById("passwordedit").value = accounts[index].passwordsignup;

  document.getElementById("index").value = index;

  document.getElementById("modal-edit").style.display = "flex";
}

function changeAccount() {
  let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
  let index = document.getElementById("index").value;
  if(confirm("Bạn có chắc chắn muốn cập nhật?")){
    accounts[index]={
      fullname: document.getElementById("fullnameedit").value,
      emailsignup: document.getElementById("emailedit").value,
      passwordsignup: document.getElementById("passwordedit").value,
    }
  }
  

  localStorage.setItem("accounts", JSON.stringify(accounts));

  document.getElementById("modal-edit").style.display = "none";
  renderListAccount();

}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  var formValues;
  // Đối tượng `Validator`
  function Validator(options) {
    function getParent(element, selector) {
      while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
          return element.parentElement;
        }
        element = element.parentElement;
      }
    }
  
    var selectorRules = {};
  
    // Hàm thực hiện validate
    function validate(inputElement, rule) {
      var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
      var errorMessage;
  
      // Lấy ra các rules của selector
      var rules = selectorRules[rule.selector];
      // Lặp qua từng rule & kiểm tra
      // Nếu có lỗi thì dừng việc kiểm
      for (var i = 0; i < rules.length; ++i) {
        switch (inputElement.type) {
          case "radio":
          case "checkbox":
            errorMessage = rules[i](
              formElement.querySelector(rule.selector + ":checked")
            );
            break;
          default:
            errorMessage = rules[i](inputElement.value);
        }
        if (errorMessage) break;
      }
  
      if (errorMessage) {
        errorElement.innerText = errorMessage;
        getParent(inputElement, options.formGroupSelector).classList.add("invalid");
      } else {
        errorElement.innerText = "";
        getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
      }
  
      return !errorMessage;
    }
  
    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
      // Khi submit form
      formElement.onsubmit = function (e) {
        e.preventDefault();
  
        var isFormValid = true;
  
        // Lặp qua từng rules và validate
        options.rules.forEach(function (rule) {
          var inputElement = formElement.querySelector(rule.selector);
          var isValid = validate(inputElement, rule);
          if (!isValid) {
            isFormValid = false;
          }
        });
  
        if (isFormValid) {
          // Trường hợp submit với javascript
          if (typeof options.onSubmit === "function") {
            var enableInputs = formElement.querySelectorAll("[name]");
            formValues = Array.from(enableInputs).reduce(function (values, input) {
              
                switch (input.type) {
                case "radio":
                    values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                    break;
                case "checkbox":
                    if (!input.matches(":checked")) {
                        values[input.name] = "";
                        return values;
                    }
                    if (!Array.isArray(values[input.name])) {
                        values[input.name] = [];
                    }
                    values[input.name].push(input.value);
                    break;
                case "file":
                    values[input.name] = input.files;
                    break;
                default:
                    values[input.name] = input.value;
                }
  
              return values;
            }, {});
            options.onSubmit(formValues);

            // Lưu danh sách account
            let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
            let fullname = document.getElementById("fullname").value;
            let emailsignup = document.getElementById("emailsignup").value;
            let passwordsignup = document.getElementById("passwordsignup").value;
            accounts.push({
                fullname: fullname,
                emailsignup: emailsignup,
                passwordsignup: passwordsignup,
            })

            localStorage.setItem("accounts", JSON.stringify(accounts));

            resetInputSignup();
            renderListAccount();
            
                // document.getElementById("form-signup-submit").innerHTML = linkLogin;

          }
          // Trường hợp submit với hành vi mặc định
          else {
            formElement.submit();
          }
        }
      };
  
      // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
      options.rules.forEach(function (rule) {

        // Lưu lại các rules cho mỗi input
        if (Array.isArray(selectorRules[rule.selector])) {
          selectorRules[rule.selector].push(rule.test);
        } else {
          selectorRules[rule.selector] = [rule.test];
        }
  
        var inputElements = formElement.querySelectorAll(rule.selector);
  
        Array.from(inputElements).forEach(function (inputElement) {
          // Xử lý trường hợp blur khỏi input
          inputElement.onblur = function () {
            validate(inputElement, rule);
          };
  
          // Xử lý mỗi khi người dùng nhập vào input
          inputElement.oninput = function () {
            var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
            errorElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
          };
        });
      });
    }

  }
  
  // Định nghĩa rules
  // Nguyên tắc của các rules:
  // 1. Khi có lỗi => Trả ra message lỗi
  // 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
  Validator.isRequired = function (selector, message) {
    return {
      selector: selector,
      test: function (value) {
        return value ? undefined : message || "Vui lòng nhập trường này";
      },
    };
  };
  
  Validator.isEmail = function (selector, message) {
    return {
      selector: selector,
      test: function (value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value) ? undefined : message || "Trường này phải là email";
      },
    };
  };
  
  Validator.minLength = function (selector, min, message) {
    return {
      selector: selector,
      test: function (value) {
        return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
      },
    };
  };
  
  Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
      selector: selector,
      test: function (value) {
        return value === getConfirmValue() ? undefined : message || "Giá trị nhập vào không chính xác";
      },
    };
  };




var mesEmail = document.querySelector('.mesEmail');
var mesPwd = document.querySelector('.mesPwd');
  
function getLoginEmail(email){
  email = document.getElementById('email-login').value
  if(email!= ""){
      // console.log(email)
  }
  if(email==""){
     mesEmail.innerText='Vui lòng nhập email'

 } else{
     mesEmail.innerText=''
 }
  return email
}

function getLoginPwd(password){
 password = document.getElementById('password-login').value
 if(password!= ""){
    //  console.log(password)
 }
 if(password==""){
     mesPwd.innerText='Vui lòng nhập mật khẩu'
     
 }else{
     mesPwd.innerText=''
 }
 return password
}

function checkLogin(event){
 event.preventDefault()
 var email = getLoginEmail(email)
 var pwd =  getLoginPwd(pwd)
 var user= {}
 var getArrSingUp = JSON.parse(localStorage.getItem('accounts'))
 var succes = false
 getArrSingUp.forEach(function(element){
    //  console.log(element)
     if(email==element['emailsignup'] && pwd==element['passwordsignup'] ){
         user['firstname'] = element['firstname']
         user['lastname']= element['lastname']
         succes = true;
     }
 })
//  console.log(user)
 if(succes){
    //  ShowWelcome()
     resetInputLogin();
     alert('Đăng nhập thành công!!!!!!')
     location.assign("http://127.0.0.1:5501/list_account.html")
     

    //  welcomeName.innerText += ', ' + user['firstname'] +' '+ user['lastname']
 } else {
     if(pwd!="" && email!=""){

         alert('Mật khẩu hoặc email không chính xác')
     }
 } 
}

function checkEmailSignUp(){
  
}
  




