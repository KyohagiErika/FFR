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
  //  ===== close navbar-collapse when a  clicked
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

//deleta btn 

let btnRemove= document.getElementById('removeBtn');
const removeSuccess= () =>{	
  btnRemove.classList.remove('success');
  let remove = document.getElementById('remove');
  remove.innerText='remove';

  }

btnRemovehandle = () => {
      btnRemove.classList.add('success');
  
      let remove = document.getElementById('remove');
      remove.innerText='success'
      setTimeout(removeSuccess, 2000);
      
  };
////////////////////accept js
const button = document.querySelector('.acceptBtn');

const removefinish =() =>{
  button.classList.remove('finished');
}
btnSucceshandle = () =>{
  button.classList.add('finished');
  setTimeout(removefinish, 3000);
}

/////////////////////////dropdown//////////////////////////////////
// let dropdown = document.getElementById("dropdown");
// let open1 = document.getElementById("open");
// let close1 = document.getElementById("close");

// let flag = true;
// const dropdownHandler = () => {
//     if (flag) {
//         dropdown.classList.add("hidden");
//         open1.classList.add("hidden");
//         close1.classList.remove("hidden");
//         flag = false;
//     } else {
//         dropdown.classList.remove("hidden");
//         close1.classList.add("hidden");
//         open1.classList.remove("hidden");
//         flag = true;
//     }
// };
//////////////////////////////////////////
const toggleModal = (modalId, show = true) => {
  const modalEl = document.getElementById(modalId);

  if (show) {
    modalEl.classList.add('flex');
    modalEl.classList.remove('hidden');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('role', 'dialog');
    modalEl.removeAttribute('aria-hidden'); // create backdrop element

    var backdropEl = document.createElement('div');
    backdropEl.setAttribute('modal-backdrop', '');
    backdropEl.classList.add('bg-gray-900', 'bg-opacity-50', 'fixed', 'inset-0', 'z-40');
    document.querySelector('main').append(backdropEl);
  } else {
    modalEl.classList.add('hidden');
    modalEl.classList.remove('flex');
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.removeAttribute('aria-modal');
    modalEl.removeAttribute('role');
    document.querySelector('[modal-backdrop]').remove();
  }
};

window.toggleModal = toggleModal;
document.querySelectorAll('[data-modal-toggle]').forEach(function (modalToggleEl) {
  var modalId = modalToggleEl.getAttribute('data-modal-toggle');
  var modalEl = document.getElementById(modalId);

  if (!modalEl.hasAttribute('aria-hidden') && !modalEl.hasAttribute('aria-modal')) {
    modalEl.setAttribute('aria-hidden', 'true');
  }

  modalToggleEl.addEventListener('click', function () {
    toggleModal(modalId, modalEl.hasAttribute('aria-hidden', 'true'));
  });
});