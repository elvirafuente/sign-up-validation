'use strict';

//inputs
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
const button = document.getElementById('button')
//form
const form = document.getElementById('validationForm');
//colors
const red = '#b71c1c';
const green = '#00bfa5'; 

let validPassword;
let validConfirmPassword; 
let validForm;

let filledName =  false;
let filledLastName =  false;
let filledPassword = false;
let filledConfirmPassword = false;
let filledEmail = false;


const sendForm = event =>{
    const {target} = event;
    event.preventDefault();
    if(filledName&&filledLastName&&filledPassword&&filledConfirmPassword&&filledEmail){
        target.nextElementSibling.innerHTML ='Thank you';
        target.nextElementSibling.style.color= '';
        target.style.borderColor='';
    } else {
        showError(target, 'Please, fill in all fields')
    }
}

const validateInput = event => {
    const {target} = event;
    const {value, id} = target;
    
    if(!value){
        showError(target, 'This field is required')

    } else {
        showCorrect(target);
        if(id === 'firstName' || id === 'lastName'){
            checkIfLetters(target)
        } else if(id === 'email'){
            checkIfValidEmail(target)
        } else if(id=== 'password'){
            checkIfValidPassword(target)
        } else if(id === 'confirmPassword'){
            checkIfSamePassword(target)
        }
        
    }
}

const checkIfSamePassword = target => {
    const {value} = target;
    validConfirmPassword = value;
    if (!validPassword){
        showError(target, 'Please, fill in "Password" field first')
    } else if (validPassword !== value){
        showError(target, 'Passwords do not match')
    } else {
        showCorrect(target);
        filledConfirmPassword = true; 
    }
}

const checkIfValidPassword = target => {
    const {value} = target;

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,}$/;
    const passwordResult = passwordRegex.test(value);
    if(!passwordResult){
        showError(target, 'Your password should have at least 6 characters, amoung numbers and letters');
    } else{
        showCorrect(target);
        validPassword = value;
        filledPassword = true;
        if(validConfirmPassword){
            showCorrect(confirmPassword)
        }
    }
}

const checkIfValidEmail = target => {
    const {value} = target;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailResult = emailRegex.test(value);
    if(!emailResult){
        showError(target, 'Please, enter a valid e-mail');
    } else{
        showCorrect(target);
        filledEmail = true;
    }
}

const checkIfLetters = target =>{
    const {value, id} = target;

    const name = value.replace(/\s+/g, '')
    const nameRegex =  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
    const nameResult = nameRegex.test(name);
    if(!nameResult){
        showError(target, 'Numbers and symbols are not allowed');
    } else{
        showCorrect(target);
        if(id==="firstName"){
            filledName = true;
        } else if (id ==="lastName"){
            filledLastName = true;
        }
    }
}

const showError = (target, message) => {
    target.nextElementSibling.innerHTML = message;
    target.nextElementSibling.style.color= red;
    target.style.borderColor=red;
}

const showCorrect = target => {
    target.nextElementSibling.innerHTML ='';
    target.nextElementSibling.style.color= '';
    target.style.borderColor='';
}

firstName.addEventListener('blur', validateInput);
lastName.addEventListener('blur', validateInput);
password.addEventListener('blur', validateInput);
confirmPassword.addEventListener('blur', validateInput);
email.addEventListener('blur', validateInput);
button.addEventListener('click', sendForm);