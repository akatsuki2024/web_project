// // Assume you have an HTML form with ID 'login-form'
// document.getElementById('studentLoginModal').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form from submitting normally

//     // Fetch username and password from the form inputs
//     const username = document.getElementById('username').value; // Input field for username
//     const password = document.getElementById('password').value; // Input field for password

//     // Make a fetch request to login the student
//     fetch('/login-student', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             username: username,
//             password: password
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             // Successfully logged in, fetch student info
//             fetch(`/api/student-info/${username}`)
//                 .then(response => response.json())
//                 .then(studentData => {
//                     // Handle student data (e.g., display it on the UI)
//                     console.log('Student Data:', studentData);
//                 })
//                 .catch(error => console.error('Error fetching student data:', error));
//         } else {
//             // Handle login failure (e.g., show an error message)
//             console.error('Login failed:', data.message);
//         }
//     })
//     .catch(error => console.error('Error during login:', error));
// });



// Assume you have an HTML form with ID 'login-form'
document.getElementById('studentLoginModal').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Fetch username and password from the form inputs
    const username = document.getElementById('username').value; // Input field for username
    const password = document.getElementById('password').value; // Input field for password

    // Make a fetch request to login the student
    fetch('/login-student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store username and password in local storage
            localStorage.setItem('username', username); // Store username
            localStorage.setItem('password', password); // Store password

            // Fetch student info
            fetch(`/api/student-info/${username}`)
                .then(response => response.json())
                .then(studentData => {
                    // Handle student data (e.g., display it on the UI)
                    console.log('Student Data:', studentData);
                })
                .catch(error => console.error('Error fetching student data:', error));
        } else {
            // Handle login failure (e.g., show an error message)
            console.error('Login failed:', data.message);
        }
    })
    .catch(error => console.error('Error during login:', error));
});

// Optional: On page load, check for stored credentials
window.onload = function() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
        // Automatically populate the login form if credentials are stored
        document.getElementById('username').value = storedUsername;
        document.getElementById('password').value = storedPassword;
    }
};
