document.getElementById('studentLogin').addEventListener('submit', function (event) {
    event.preventDefault();

    const studentIdentifier = document.getElementById('studentIdentifier').value; // Username or College ID
    const studentPassword = document.getElementById('studentPassword').value;

    // AJAX request to server for authentication
    fetch('http://127.0.0.1:5000/login-student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: studentIdentifier, // Using the updated identifier
            password: studentPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store the username in sessionStorage
            sessionStorage.setItem('username', studentIdentifier); // Using the updated identifier

            // Redirect to the student dashboard
            window.location.href = '/html/student-page.html';
        } else {
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        document.getElementById('loginError').innerText = 'An error occurred. Please try again.';
    });
});

