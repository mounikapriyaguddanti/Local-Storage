// script.js
const form = document.getElementById('registrationForm');
const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const username = document.getElementById('username').value;

    const user = {
        fullName,
        email,
        mobile,
        username
    };

    registeredUsers.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    form.reset();
    alert('Registration successful!');
});