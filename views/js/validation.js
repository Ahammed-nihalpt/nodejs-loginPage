const form = document.querySelector('form');
const usrname = document.querySelector('input[type=text]');
const password = document.querySelector('input[type=password]');


form.addEventListener("submit", (event)=>{
    if (usrname.value==="" || password.value==="") {
        event.preventDefault();
        alert('Please fill the form');
        return false;
    }
})

