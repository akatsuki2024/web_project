
// // Retrieve the student's identifier and semester from the URL
// const params = new URLSearchParams(window.location.search);
// const identifier = params.get('identifier'); // College ID
// const semester = params.get('semester');

// // Display the student's name on the dashboard and load subjects
// async function loadStudentSubjects() {
//     try {
//         // Fetch the student's data from the server based on the semester and identifier (college ID)
//         const response = await fetch(`http://localhost:5000/get-student-subjects/${semester}/${identifier}`);
//         const data = await response.json();

//         if (data.success) {
//             // Display student full name
//             document.getElementById('student-name').innerText = `Hello, ${data.fullname}!`;

//             // Get the subjects container element
//             const subjectsContainer = document.getElementById('subjects-container');

//             // Clear existing content in case of re-load
//             subjectsContainer.innerHTML = '';

//             // Loop through each subject and create a subject card
//             data.subjects.forEach(subject => {
//                 const subjectCard = document.createElement('div');
//                 subjectCard.className = 'subject-card card mb-3'; // Added Bootstrap classes for styling

//                 subjectCard.innerHTML = `
//                     <div class="card-body">
//                         <h3 class="card-title">${subject.id} - ${subject.name}</h3>
//                         <div class="action-buttons mt-3">
//                             <button class="btn btn-primary" onclick="viewMarks('${subject.id}')">View Marks</button>
//                             <button class="btn btn-secondary" onclick="viewAttendance('${subject.id}')">View Attendance</button>
//                         </div>
//                     </div>
//                 `;

//                 subjectsContainer.appendChild(subjectCard);
//             });
//         } else {
//             document.getElementById('subjects-container').innerText = 'No subjects found for the given student.';
//         }
//     } catch (error) {
//         console.error('Error fetching student subjects:', error);
//     }
// }

// // Function to view marks for a subject
// function viewMarks(subjectId) {
//     // Redirect to a marks viewing page with correct parameters
//     window.location.href = `../html/view-student-marks.html?subjectId=${subjectId}&semester=${semester}&identifier=${identifier}`;
// }

// // Function to view attendance for a subject
// function viewAttendance(subjectId) {
//     // Redirect to an attendance viewing page
//     window.location.href = `../html/view-student-attendance.html?subjectId=${subjectId}&semester=${semester}&identifier=${identifier}`;
// }


// // Function to logout the student
// function logout() {
//     window.location.href = '../html/index.html'; // Ensure this points to your main index file
// }

// // Load student subjects on page load
// window.onload = loadStudentSubjects;


// Retrieve the student's identifier and semester from the URL
const params = new URLSearchParams(window.location.search);
const identifier = params.get('identifier'); // College ID
const semester = params.get('semester');

// Display the student's name on the dashboard and load subjects
async function loadStudentSubjects() {
    try {
        // Fetch the student's data from the server based on the semester and identifier (college ID)
        const response = await fetch(`http://localhost:5000/get-student-subjects/${semester}/${identifier}`);
        const data = await response.json();

        if (data.success) {
            // Display student full name
            document.getElementById('student-name').innerText = `Hello, ${data.fullname}!`;

            // Get the subjects container element
            const subjectsContainer = document.getElementById('subjects-container');

            // Clear existing content in case of re-load
            subjectsContainer.innerHTML = '';

            // Loop through each subject and create a subject card
            data.subjects.forEach(subject => {
                const subjectCard = document.createElement('div');
                subjectCard.className = 'subject-card card mb-3'; // Added Bootstrap classes for styling

                subjectCard.innerHTML = `
                    <div class="card-body">
                        <h3 class="card-title">${subject.id} - ${subject.name}</h3>
                        <div class="action-buttons mt-3">
                            <button class="btn btn-primary" onclick="viewMarks('${subject.id}')">View Marks</button>
                            <button class="btn btn-secondary" onclick="viewAttendance('${subject.id}')">View Attendance</button>
                        </div>
                    </div>
                `;

                subjectsContainer.appendChild(subjectCard);
            });
        } else {
            document.getElementById('subjects-container').innerText = 'No subjects found for the given student.';
        }
    } catch (error) {
        console.error('Error fetching student subjects:', error);
    }
}

// Function to view marks for a subject
function viewMarks(subjectId) {
    // Redirect to a marks viewing page with correct parameters
    window.location.href = `../html/view-student-marks.html?subjectId=${subjectId}&semester=${semester}&identifier=${identifier}`;
}

// Function to view attendance for a subject
function viewAttendance(subjectId) {
    // Redirect to an attendance viewing page
    window.location.href = `../html/view-student-attendance.html?subjectId=${subjectId}&semester=${semester}&identifier=${identifier}`;
}

// Function to logout the student
function logout() {
    window.location.href = '../html/index.html'; // Ensure this points to your main index file
}

// Function to open the modal for upgrading semester
function openUpgradeModal() {
    const upgradeModal = new bootstrap.Modal(document.getElementById('upgradeModal'));
    upgradeModal.show();
}

// Function to upgrade semester
async function upgradeSemester() {
    const yearInput = document.getElementById('yearInput').value;

    if (!yearInput || !/^\d{4}-\d{2}$/.test(yearInput)) {
        alert('Please enter a valid academic year (e.g., 2024-25).');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/upgrade-student-semester', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: identifier,
                semester: semester,
                year: yearInput
            })
        });

        const data = await response.json();

        if (data.success) {
            alert('Semester upgraded successfully! You will be logged out now.');
            logout(); // Log the student out after the upgrade
        } else {
            alert(`Failed to upgrade semester: ${data.message}`);
        }
    } catch (error) {
        console.error('Error upgrading semester:', error);
        alert('An error occurred during the upgrade process.');
    }
}

// Load student subjects on page load
window.onload = loadStudentSubjects;
