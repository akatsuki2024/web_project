
document.addEventListener('DOMContentLoaded', function() {
    // Show student login form and hide teacher login form when "Student Login" button is clicked
    document.getElementById('studentLoginBtn').addEventListener('click', function() {
        document.getElementById('studentLoginForm').style.display = 'block';
        document.getElementById('teacherLoginForm').style.display = 'none';
    });
  
    // Show teacher login form and hide student login form when "Teacher Login" button is clicked
    document.getElementById('teacherLoginBtn').addEventListener('click', function() {
        document.getElementById('teacherLoginForm').style.display = 'block';
        document.getElementById('studentLoginForm').style.display = 'none';
    });
  
    // Redirect to student registration page when "Register as Student" button is clicked
    document.getElementById('studentRegisterBtn').addEventListener('click', function() {
        window.location.href = 'student-register.html';
    });
  
    // Redirect to teacher registration page when "Register as Teacher" button is clicked
    document.getElementById('teacherRegisterBtn').addEventListener('click', function() {
        window.location.href = 'teacher-register.html';
    });

    document.getElementById('branch').addEventListener('change', function() {
        const divisionContainer = document.getElementById('divisionContainer');
        const selectedBranch = this.value;
      
        if (selectedBranch === 'IT') {
          divisionContainer.style.display = 'none'; // Hide division for IT
        } else {
          divisionContainer.style.display = 'block'; // Show division for CS and EXTC
        }
      });
      
  });
  