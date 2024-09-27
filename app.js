// Admin login credentials (hardcoded for simplicity)
const adminCredentials = {
    username: "admin",
    password: "admin123"
};

// Mock user data
let users = [
    { id: 1, username: 'user1', balance: 100, paymentDue: 20 },
    { id: 2, username: 'user2', balance: 200, paymentDue: 40 }
];

// Login function
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
        updateDashboard();
    } else {
        document.getElementById('loginError').textContent = 'Invalid username or password';
    }
});

// Logout function
document.getElementById('logoutBtn').addEventListener('click', function() {
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('loginError').textContent = '';
    document.getElementById('loginForm').reset();
});

// Update dashboard stats
function updateDashboard() {
    const totalUsers = users.length;
    const totalPayments = users.reduce((sum, user) => sum + user.paymentDue, 0);
    document.getElementById('totalUsers').textContent = totalUsers;
    document.getElementById('totalPayments').textContent = `${totalPayments}`;
    populateUserTable();
}

// Populate user management table
function populateUserTable() {
    const userTableBody = document.querySelector('#userTable tbody');
    userTableBody.innerHTML = ''; // Clear the table

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.balance}</td>
            <td>${user.paymentDue}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;

        userTableBody.appendChild(row);
    });
}

// Add new user
document.getElementById('addUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('addUsername').value;
    const balance = parseFloat(document.getElementById('addBalance').value);
    const paymentDue = parseFloat(document.getElementById('addPaymentDue').value);

    const newUser = {
        id: users.length + 1,
        username,
        balance,
        paymentDue
    };

    users.push(newUser);
    document.getElementById('addUserForm').reset();
    document.getElementById('addUserMessage').textContent = 'User added successfully';
    updateDashboard();
});

// Edit user (for simplicity, opens a prompt to update user details)
function editUser(id) {
    const user = users.find(user => user.id === id);
    const newBalance = parseFloat(prompt("Enter new balance:", user.balance));
    const newPaymentDue = parseFloat(prompt("Enter new payment due:", user.paymentDue));

    if (!isNaN(newBalance) && !isNaN(newPaymentDue)) {
        user.balance = newBalance;
        user.paymentDue = newPaymentDue;
        updateDashboard();
    }
}


