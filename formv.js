document.querySelector('#form-btn')
.addEventListener('click',function(){
    let isNameEmpty = false;
    let isEmailInvalid = false;
    let isMessageTooShort = false;
    let radioButtonNotChecked = false;

    let userName = document.querySelector('#form-name').value;
    let email = document.querySelector('#form-email').value;
    let enquiryBtn = document.querySelector('#enquiry').checked;
    let suggestionsBtn = document.querySelector('#suggestions').checked;
    let othersBtn = document.querySelector('#others').checked;
    let message = document.querySelector('#form-message').value;

    if (userName === ""){
        isNameEmpty = true;
    }

    if (!email.includes('@') || !email.includes('.')){
        isEmailInvalid = true;
    }

    if (message.length < 5){
        isMessageTooShort = true
    }
    if (!enquiryBtn & !suggestionsBtn & !othersBtn){
        radioButtonNotChecked = true
    }


    if (isNameEmpty){
        document.querySelector('#nameError').style.opacity = "1"
    }else{
        document.querySelector('#nameError').style.opacity = "0"
    }
    if (isEmailInvalid){
        document.querySelector('#emailError').style.opacity = "1"
    }else{
        document.querySelector('#emailError').style.opacity = "0"
    }
    if (radioButtonNotChecked){
        document.querySelector('#radioError').style.opacity = "1"
    }else{
        document.querySelector('#radioError').style.opacity = "0"
    }
    if (isMessageTooShort){
        document.querySelector('#messageError').style.opacity = "1"
    }else{
        document.querySelector('#messageError').style.opacity = "0"
    }

})

formIcon = document.querySelector('#form-icon')
formIcon.addEventListener('click', function(){
    document.querySelector("#form-container").style.display = "block"
})

formClose = document.querySelector('#close-form')
formClose.addEventListener('click',function(){
    document.querySelector("#form-container").style.display = "none";
    document.querySelector('#enquiry').checked = false;
    document.querySelector('#suggestions').checked = false
    document.querySelector('#others').checked = false;
    document.querySelector('#form-name').value = "";
    document.querySelector('#form-email').value = "";
    document.querySelector('#form-message').value = ""
    document.querySelector('#nameError').style.opacity = "0";
    document.querySelector('#emailError').style.opacity = "0";
    document.querySelector('#radioError').style.opacity = "0";
    document.querySelector('#messageError').style.opacity = "0"
})