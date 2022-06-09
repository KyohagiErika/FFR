(function () {
    "use strict";
addEventListener('scroll', function() {
    const ud_header = document.querySelector(".header");
    const sticky = ud_header.offsetTop*0;
   

    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }
    // console.log(window.pageYOffset);
    // console.log(sticky);

    // show or hide the back-top-top button
    // const backToTop = document.querySelector(".back-to-top");
    // if (
    //   document.body.scrollTop > 50 ||
    //   document.documentElement.scrollTop > 50
    // ) {
    //   backToTop.style.display = "flex";
    // } else {
    //   backToTop.style.display = "none";
    // }
})
  // ===== responsive navbar
  let navbarToggler = document.querySelector("#navbarToggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");

  navbarToggler.addEventListener("click", () => {
  navbarToggler.classList.toggle("navbarTogglerActive");
  navbarCollapse.classList.toggle("hidden");
});
   //===== close navbar-collapse when a  clicked
   document
   .querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a")
   .forEach((e) =>
     e.addEventListener("click", () => {
       navbarToggler.classList.remove("navbarTogglerActive");
       navbarCollapse.classList.add("hidden");
     })
   );
    // ===== Sub-menu
  const submenuItems = document.querySelectorAll(".submenu-item");
  submenuItems.forEach((el) => {
    el.querySelector("a").addEventListener("click", () => {
      el.querySelector(".submenu").classList.toggle("hidden");
    });
  });
})();


// Sign in 
let listAccount = [];

class Account {
  constructor(username, password, fullname, role) {
    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.role = role;
  }
}

let adminAccount = new Account(
  "minh@gmail.com",
  "minh123",
  "minh",
  "admin"
);
listAccount.push(adminAccount);

//event
let buttonTag = document.getElementById("signin-button");

buttonTag.addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let account = listAccount.filter(function (account) {
    return account.username == username && account.password == password;
  });

  
  if (account.length == 0) {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    Swal.fire({
      icon: "error",
      title: "Thông báo",
      text: "Tài khoản không tồn tại!",
    });
  } else {
    let accountJson = JSON.stringify(account[0]);
    Swal.fire({
      icon: "success",
      title: "Thông báo",
      text: "đăng nhập thành công"
    });
    // setTimeout( window.location.href = "./admin.html",5000)
    sessionStorage.setItem("ACCOUNT", accountJson);
   
   
  }
});