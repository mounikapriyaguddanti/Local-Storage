
// dashboard.js
const userTable = document.getElementById('userTable');
const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
const updateModal = document.getElementById('updateModal');
const closeModal = document.getElementsByClassName('close')[0];
const updateForm = document.getElementById('updateForm');

registeredUsers.forEach((user, index) => {
    const row = document.createElement('tr');

    const fullNameCell = document.createElement('td');
    fullNameCell.textContent = user.fullName;
    row.appendChild(fullNameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    const mobileCell = document.createElement('td');
    mobileCell.textContent = user.mobile;
    row.appendChild(mobileCell);

    const usernameCell = document.createElement('td');
    usernameCell.textContent = user.username;
    row.appendChild(usernameCell);

    const actionsCell = document.createElement('td');
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => showUpdateForm(user, row));
    actionsCell.appendChild(updateButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteUser(index));
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);
    userTable.appendChild(row);
});

function showUpdateForm(user, row) {
    document.getElementById('updateFullName').value = user.fullName;
    document.getElementById('updateEmail').value = user.email;
    document.getElementById('updateMobile').value = user.mobile;
    document.getElementById('updateUsername').value = user.username;

    updateModal.style.display = 'block';

    updateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateUserDetails(user.username, row);
    });
}

function updateUserDetails(username, row) {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const userIndex = registeredUsers.findIndex(u => u.username === username);

    if (userIndex !== -1) {
        const updatedUser = {
            fullName: document.getElementById('updateFullName').value,
            email: document.getElementById('updateEmail').value,
            mobile: document.getElementById('updateMobile').value,
            username: document.getElementById('updateUsername').value
        };

        registeredUsers[userIndex] = updatedUser;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        // Update the corresponding table row with the new values
        const cells = row.getElementsByTagName('td');
        cells[0].textContent = updatedUser.fullName;
        cells[1].textContent = updatedUser.email;
        cells[2].textContent = updatedUser.mobile;
        cells[3].textContent = updatedUser.username;

        alert('User details updated successfully!');
        updateModal.style.display = 'none';
    } else {
        alert('User not found!');
        updateModal.style.display = 'none';
    }

    updateForm.removeEventListener('submit', updateUserDetails);
}

function deleteUser(index) {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    if (confirm(`Are you sure you want to delete the user: ${registeredUsers[index].username}?`)) {
        registeredUsers.splice(index, 1);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        alert('User deleted successfully!');
        location.reload();
    }
}

// Close the modal when the close button is clicked
closeModal.onclick = function() {
    updateModal.style.display = 'none';
    updateForm.removeEventListener('submit', updateUserDetails);
}

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
    if (event.target == updateModal) {
        updateModal.style.display = 'none';
        updateForm.removeEventListener('submit', updateUserDetails);
    }
}