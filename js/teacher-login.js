document.getElementById('teacherLoginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const teacherIdentifier = document.getElementById('teacherIdentifier').value;
    const teacherPassword = document.getElementById('teacherPassword').value;
  
    // AJAX request to server for authentication
    fetch('http://127.0.0.1:5000/login-teacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: teacherIdentifier,
        password: teacherPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = 'Teacher-Page.html'; // Redirect to teacher's dashboard
      } else {
        document.getElementById('loginError').innerText = 'Invalid username or password';
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      document.getElementById('loginError').innerText = 'An error occurred. Please try again.';
    });
  });
  