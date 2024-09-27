// document.addEventListener('DOMContentLoaded', function () {
//     const subjectCode = sessionStorage.getItem('selectedSubjectCode');
//     const semester = sessionStorage.getItem('selectedSemester');
//     const subjectName = sessionStorage.getItem('selectedSubjectName');

//     if (!subjectCode || !semester || !subjectName) {
//         alert('Subject name, code, or semester is missing. Please go back and select the subject again.');
//         window.location.href = '../html/teacher-page.html';
//         return;
//     }

//     // Fetch existing marks for the selected subject and semester to check IA-I status
//     fetch(`http://localhost:5000/get-marks/${semester}/${subjectCode}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 const existingMarks = data.marks || [];

//                 const container = document.getElementById('marksContainer');
//                 container.innerHTML = '';

//                 // Get student data for displaying
//                 fetch(`http://localhost:5000/get-students/${semester}/${subjectCode}`)
//                     .then(response => response.json())
//                     .then(data => {
//                         if (data.success) {
//                             let students = data.students;

//                             // Sort students by roll number in ascending order
//                             students.sort((a, b) => parseInt(a.rollno) - parseInt(b.rollno));

//                             // Create a lookup map for existing IA-I marks
//                             const marksMap = {};
//                             existingMarks.forEach(mark => {
//                                 marksMap[mark.rollno] = mark;
//                             });

//                             students.forEach(student => {
//                                 const row = document.createElement('tr');
//                                 const ia1Value = marksMap[student.rollno]?.ia1 || '';
//                                 const ia2Value = marksMap[student.rollno]?.ia2 || '';

//                                 row.innerHTML = `
//                                     <td>${student.rollno}</td>
//                                     <td>${student.fullname}</td>
//                                     <td>${student.collegeid}</td>
//                                     <td><input type="number" name="ia1-${student.rollno}" min="0" max="20" placeholder="IA-I Marks" value="${ia1Value}"></td>
//                                     <td><input type="number" name="ia2-${student.rollno}" min="0" max="20" placeholder="IA-II Marks" value="${ia2Value}" ${ia1Value ? '' : 'disabled'}></td>
//                                 `;
//                                 container.appendChild(row);
//                             });

//                             // Enable/disable IA-II based on existing IA-I marks
//                             document.querySelectorAll(`input[name^='ia1-']`).forEach(input => {
//                                 input.addEventListener('input', function () {
//                                     const rollNo = this.name.split('-')[1];
//                                     const ia2Input = document.querySelector(`input[name='ia2-${rollNo}']`);
//                                     ia2Input.disabled = this.value === ''; // Enable IA-II only if IA-I is entered
//                                 });
//                             });
//                         } else {
//                             alert('Failed to fetch students for the selected subject.');
//                         }
//                     })
//                     .catch(error => console.error('Error fetching students:', error));
//             } else {
//                 alert('Failed to fetch existing marks data.');
//             }
//         })
//         .catch(error => console.error('Error fetching existing marks:', error));

//     // Handle marks submission
//     document.getElementById('marks-form').addEventListener('submit', function (event) {
//         event.preventDefault();

//         const marksData = [];
//         document.querySelectorAll('#marksContainer tr').forEach(row => {
//             const rollNo = row.cells[0].textContent;
//             const name = row.cells[1].textContent;
//             const collegeID = row.cells[2].textContent;
//             const ia1 = row.querySelector(`input[name=ia1-${rollNo}]`).value || null;
//             const ia2 = row.querySelector(`input[name=ia2-${rollNo}]`).value || null;

//             // Only include IA-II if IA-I is already filled in
//             if (ia1 !== null) {
//                 marksData.push({
//                     rollno: rollNo,
//                     studentName: name,
//                     collegeID,
//                     ia1: ia1 ? parseInt(ia1) : null,
//                     ia2: ia2 ? parseInt(ia2) : null
//                 });
//             }
//         });

//         // Submit marks data to the server
//         fetch('http://localhost:5000/submit-marks', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 subjectCode,
//                 semester,
//                 marks: marksData
//             })
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     alert('Marks submitted successfully!');
//                     window.location.href = '../html/teacher-page.html';
//                 } else {
//                     alert('Failed to submit marks. Please try again.');
//                 }
//             })
//             .catch(error => console.error('Error submitting marks:', error));
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    // Retrieve session data
    const subjectCode = sessionStorage.getItem('selectedSubjectCode');
    const semester = sessionStorage.getItem('selectedSemester');
    const subjectName = sessionStorage.getItem('selectedSubjectName');

    // Check if all required data is available
    if (!subjectCode || !semester || !subjectName) {
        alert('Subject name, code, or semester is missing. Please go back and select the subject again.');
        window.location.href = '../html/teacher-page.html';
        return;
    }

    // Set the subject name in the header of the page
    const subjectNameElement = document.getElementById('subject-name');
    if (subjectNameElement) {
        subjectNameElement.textContent = `Enter Marks for ${subjectName}`;
    } else {
        console.error('Element with ID "subject-name" not found.');
        return;
    }

    // Fetch existing marks data for the selected subject and semester
    fetch(`http://localhost:5000/get-marks/${semester}/${subjectCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const existingMarks = data.marks || [];

                const container = document.getElementById('marksContainer');
                container.innerHTML = '';

                // Create a lookup map for existing IA-I marks
                const marksMap = {};
                existingMarks.forEach(mark => {
                    marksMap[mark.rollno] = mark;
                });

                // Fetch students for the selected subject and semester
                fetch(`http://localhost:5000/get-students/${semester}/${subjectCode}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            let students = data.students;

                            // Sort students by roll number in ascending order
                            students.sort((a, b) => parseInt(a.rollno) - parseInt(b.rollno));

                            students.forEach(student => {
                                const row = document.createElement('tr');
                                const ia1Value = marksMap[student.rollno]?.ia1 || '';
                                const ia2Value = marksMap[student.rollno]?.ia2 || '';

                                // Disable IA-II if no IA-I marks are present in the database
                                const ia2Disabled = ia1Value ? '' : 'disabled';

                                row.innerHTML = `
                                    <td>${student.rollno}</td>
                                    <td>${student.fullname}</td>
                                    <td>${student.collegeid}</td>
                                    <td><input type="number" name="ia1-${student.rollno}" min="0" max="20" placeholder="IA-I Marks" value="${ia1Value}"></td>
                                    <td><input type="number" name="ia2-${student.rollno}" min="0" max="20" placeholder="IA-II Marks" value="${ia2Value}" ${ia2Disabled}></td>
                                `;
                                container.appendChild(row);
                            });

                            // Enable/disable IA-II based on IA-I input changes
                            document.querySelectorAll(`input[name^='ia1-']`).forEach(input => {
                                input.addEventListener('input', function () {
                                    const rollNo = this.name.split('-')[1];
                                    const ia2Input = document.querySelector(`input[name='ia2-${rollNo}']`);
                                    ia2Input.disabled = this.value === ''; // Enable IA-II only if IA-I is entered
                                });
                            });

                            // Search functionality to filter students by Roll Number
                            const searchBox = document.getElementById('searchBox');
                            searchBox.addEventListener('input', function () {
                                const searchValue = searchBox.value.toLowerCase();
                                document.querySelectorAll('#marksContainer tr').forEach(row => {
                                    const rollNo = row.cells[0].textContent.toLowerCase();
                                    row.style.display = rollNo.includes(searchValue) ? '' : 'none';
                                });
                            });
                        } else {
                            alert('Failed to fetch students for the selected subject.');
                            console.error('Failed to fetch students for the selected subject:', data.message);
                        }
                    })
                    .catch(error => {
                        alert('Error fetching student data.');
                        console.error('Error fetching students:', error);
                    });
            } else {
                alert('Failed to fetch existing marks data.');
                console.error('Failed to fetch existing marks data:', data.message);
            }
        })
        .catch(error => {
            alert('Error fetching existing marks data.');
            console.error('Error fetching existing marks data:', error);
        });

    // Handle marks submission
    document.getElementById('marks-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const marksData = [];
        document.querySelectorAll('#marksContainer tr').forEach(row => {
            const rollNo = row.cells[0].textContent;
            const name = row.cells[1].textContent;
            const collegeID = row.cells[2].textContent;
            const ia1 = row.querySelector(`input[name=ia1-${rollNo}]`).value || null;
            const ia2 = row.querySelector(`input[name=ia2-${rollNo}]`).value || null;

            // Only include IA-II if IA-I is already filled in
            marksData.push({
                rollno: rollNo,
                studentName: name,
                collegeID,
                ia1: ia1 ? parseInt(ia1) : null,
                ia2: ia2 ? parseInt(ia2) : null
            });
        });

        // Log the marks data being submitted for debugging
        console.log('Submitting Marks Data:', marksData);

        // Submit marks data to the server
        fetch('http://localhost:5000/submit-marks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subjectCode,
                semester,
                marks: marksData
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Marks submitted successfully!');
                    window.location.href = '../html/teacher-page.html';
                } else {
                    alert('Failed to submit marks. Please try again.');
                    console.error('Failed to submit marks:', data.message);
                }
            })
            .catch(error => {
                alert('Error submitting marks.');
                console.error('Error submitting marks:', error);
            });
    });
});
