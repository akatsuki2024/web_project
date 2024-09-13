document.getElementById('studentLoginBtn').addEventListener('click', function() {
  document.getElementById('studentLoginForm').style.display = 'block';
  document.getElementById('teacherLoginForm').style.display = 'none';
});

document.getElementById('teacherLoginBtn').addEventListener('click', function() {
  document.getElementById('teacherLoginForm').style.display = 'block';
  document.getElementById('studentLoginForm').style.display = 'none';
});

document.getElementById('studentRegisterBtn').addEventListener('click', function() {
  window.location.href = 'student-register.html';
});

document.getElementById('teacherRegisterBtn').addEventListener('click', function() {
  window.location.href = 'teacher-register.html';
});
