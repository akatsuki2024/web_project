
// document.addEventListener('DOMContentLoaded', function () {
//     // Retrieve subject and semester data from sessionStorage
//     const subjectCode = sessionStorage.getItem('selectedSubjectCode');
//     const semester = sessionStorage.getItem('selectedSemester');
//     const subjectName = sessionStorage.getItem('selectedSubjectName');

//     // Check if all required data is available
//     if (!subjectCode || !semester || !subjectName) {
//         alert('Subject name or code or semester is missing. Please go back and select the subject again.');
//         window.location.href = '../html/teacher-dashboard.html';
//         return;
//     }

//     // Display the subject name on the page
//     document.getElementById('subject-name').textContent = subjectName;

//     // Fetch students for the selected subject and semester
//     fetch(`http://localhost:5000/get-students/${semester}/${subjectCode}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 let students = data.students;

//                 // Sort students by roll number in ascending order
//                 students.sort((a, b) => parseInt(a.rollno) - parseInt(b.rollno));

//                 const tableBody = document.getElementById('students-table-body');
//                 tableBody.innerHTML = ''; // Clear any existing rows

//                 students.forEach(student => {
//                     const row = document.createElement('tr');

//                     const rollNoCell = document.createElement('td');
//                     rollNoCell.textContent = student.rollno;
//                     row.appendChild(rollNoCell);

//                     const nameCell = document.createElement('td');
//                     nameCell.textContent = student.fullname;
//                     row.appendChild(nameCell);

//                     const presentCell = document.createElement('td');
//                     const presentInput = document.createElement('input');
//                     presentInput.type = 'radio';
//                     presentInput.name = `attendance-${student.rollno}`;
//                     presentInput.value = 'Present';
//                     presentCell.appendChild(presentInput);
//                     row.appendChild(presentCell);

//                     const absentCell = document.createElement('td');
//                     const absentInput = document.createElement('input');
//                     absentInput.type = 'radio';
//                     absentInput.name = `attendance-${student.rollno}`;
//                     absentInput.value = 'Absent';
//                     absentCell.appendChild(absentInput);
//                     row.appendChild(absentCell);

//                     const commentCell = document.createElement('td');
//                     const commentInput = document.createElement('input');
//                     commentInput.type = 'text';
//                     commentInput.name = `comment-${student.rollno}`;
//                     commentCell.appendChild(commentInput);
//                     row.appendChild(commentCell);

//                     tableBody.appendChild(row);
//                 });
//             } else {
//                 alert('Failed to fetch students for the selected subject.');
//             }
//         })
//         .catch(error => console.error('Error fetching students:', error));

//     // Handle attendance submission
//     const attendanceForm = document.getElementById('attendance-form');
//     attendanceForm.addEventListener('submit', function (event) {
//         event.preventDefault();

//         const date = document.getElementById('attendance-date').value;
//         const attendanceData = [];

//         document.querySelectorAll('#students-table-body tr').forEach(row => {
//             const rollNo = row.cells[0].textContent;
//             const name = row.cells[1].textContent;
//             const present = row.querySelector(`input[name=attendance-${rollNo}]:checked`);
//             const comment = row.querySelector(`input[name=comment-${rollNo}]`).value;

//             if (present) {
//                 attendanceData.push({
//                     rollno: rollNo,
//                     name: name,
//                     present: present.value,
//                     comment: comment
//                 });
//             }
//         });

//         // Submit attendance
//         fetch('http://localhost:5000/submit-attendance', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 date,
//                 subjectCode,
//                 semester,
//                 attendance: attendanceData
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 alert('Attendance saved successfully!');
//             } else {
//                 alert('Failed to save attendance. Please try again.');
//             }
//         })
//         .catch(error => console.error('Error saving attendance:', error));
//     });
// });



document.addEventListener('DOMContentLoaded', function () {
    // Retrieve subject and semester data from sessionStorage
    const subjectCode = sessionStorage.getItem('selectedSubjectCode');
    const semester = sessionStorage.getItem('selectedSemester');
    const subjectName = sessionStorage.getItem('selectedSubjectName');

    // Check if all required data is available
    if (!subjectCode || !semester || !subjectName) {
        alert('Subject name or code or semester is missing. Please go back and select the subject again.');
        window.location.href = '../html/teacher-page.html'; // Changed redirect path here
        return;
    }

    // Display the subject name on the page
    document.getElementById('subject-name').textContent = subjectName;

    // Fetch students for the selected subject and semester
    fetch(`http://localhost:5000/get-students/${semester}/${subjectCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let students = data.students;

                // Sort students by roll number in ascending order
                students.sort((a, b) => parseInt(a.rollno) - parseInt(b.rollno));

                const tableBody = document.getElementById('students-table-body');
                tableBody.innerHTML = ''; // Clear any existing rows

                students.forEach(student => {
                    const row = document.createElement('tr');

                    const rollNoCell = document.createElement('td');
                    rollNoCell.textContent = student.rollno;
                    row.appendChild(rollNoCell);

                    const nameCell = document.createElement('td');
                    nameCell.textContent = student.fullname;
                    row.appendChild(nameCell);

                    // Create 'Present' radio button
                    const presentCell = document.createElement('td');
                    const presentInput = document.createElement('input');
                    presentInput.type = 'radio';
                    presentInput.name = `attendance-${student.rollno}`;
                    presentInput.value = 'Present';
                    presentCell.appendChild(presentInput);
                    row.appendChild(presentCell);

                    // Create 'Absent' radio button and set it checked by default
                    const absentCell = document.createElement('td');
                    const absentInput = document.createElement('input');
                    absentInput.type = 'radio';
                    absentInput.name = `attendance-${student.rollno}`;
                    absentInput.value = 'Absent';
                    absentInput.checked = true; // Default to Absent
                    absentCell.appendChild(absentInput);
                    row.appendChild(absentCell);

                    const commentCell = document.createElement('td');
                    const commentInput = document.createElement('input');
                    commentInput.type = 'text';
                    commentInput.name = `comment-${student.rollno}`;
                    commentCell.appendChild(commentInput);
                    row.appendChild(commentCell);

                    tableBody.appendChild(row);
                });
            } else {
                alert('Failed to fetch students for the selected subject.');
            }
        })
        .catch(error => console.error('Error fetching students:', error));

    // Handle attendance submission
    const attendanceForm = document.getElementById('attendance-form');
    attendanceForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const date = document.getElementById('attendance-date').value;
        const attendanceData = [];

        document.querySelectorAll('#students-table-body tr').forEach(row => {
            const rollNo = row.cells[0].textContent;
            const name = row.cells[1].textContent;
            const present = row.querySelector(`input[name=attendance-${rollNo}]:checked`);
            const comment = row.querySelector(`input[name=comment-${rollNo}]`).value;

            if (present) {
                attendanceData.push({
                    rollno: rollNo,
                    name: name,
                    present: present.value,
                    comment: comment
                });
            }
        });

        // Submit attendance
        fetch('http://localhost:5000/submit-attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date,
                subjectCode,
                semester,
                attendance: attendanceData
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Attendance saved successfully!');
                // Redirect back to the teacher-page.html after successful submission
                window.location.href = '../html/teacher-page.html'; // Changed redirect path here
            } else {
                alert('Failed to save attendance. Please try again.');
            }
        })
        .catch(error => console.error('Error saving attendance:', error));
    });
});
