
// Fetch student data and display it
document.addEventListener('DOMContentLoaded', function () {
    // Assuming the username is stored in sessionStorage after login
    const username = sessionStorage.getItem('username');
    
    if (username) {
        // Fetch the student information from the server
        fetch(`http://localhost:5000/student-info/${username}`)
            .then(response => response.json())
            .then(studentData => {
                if (studentData) {
                    document.getElementById('fullname').textContent = studentData.fullname;
                    document.getElementById('username').textContent = studentData.username;
                    document.getElementById('collegeid').textContent = studentData.collegeid;
                    document.getElementById('phoneno').textContent = studentData.phoneno;
                    document.getElementById('address').textContent = studentData.address;
                    document.getElementById('rollno').textContent = studentData.rollno;
                    document.getElementById('semester').textContent = studentData.semester;

                    // Display subjects as a comma-separated string
                    const subjects = studentData.subjects.map(subj => subj.name).join(', ');
                    document.getElementById('subjects').textContent = subjects;
                } else {
                    alert('Student data not found.');
                }
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
                alert('Error fetching student data.');
            });
    } else {
        alert('No username found in session storage.');
    }
});

// Redirect to respective pages on button click
document.getElementById('view-attendance').addEventListener('click', function () {
    window.location.href = '/attendance.html';  // Modify this based on your actual page/route
});

document.getElementById('view-marks').addEventListener('click', function () {
    window.location.href = '/marks.html';  // Modify this based on your actual page/route
});
