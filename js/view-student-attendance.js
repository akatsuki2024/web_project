


// document.addEventListener('DOMContentLoaded', function () {
//     let originalData = [];

//     // Retrieve URL parameters
//     const params = new URLSearchParams(window.location.search);
//     const identifier = params.get('identifier'); // College ID of the student
//     const semester = params.get('semester'); // Student's semester
//     const subjectCode = params.get('subjectId'); // Selected subject code

//     // Update UI to show the subject code
//     document.querySelector('span').innerText = subjectCode;

//     // Fetch attendance data for the student based on the selected subject and semester
//     fetch(`http://localhost:5000/view-student-attendance/${semester}/${subjectCode}/${identifier}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 console.log("Fetched Attendance Data: ", data.attendanceRecords); // Log the data for debugging
//                 originalData = data.attendanceRecords;
//                 displayAttendanceRecords(originalData);
//                 calculateAttendancePercentage(originalData); // Calculate percentage initially
//             } else {
//                 displayNoRecordsMessage();
//                 console.error('Failed to fetch attendance records:', data.message);
//             }
//         })
//         .catch(error => {
//             displayNoRecordsMessage();
//             console.error('Error fetching attendance records:', error);
//         });

//     // Function to display attendance records in a table format
//     function displayAttendanceRecords(records) {
//         const container = document.getElementById('attendanceResultsContainer');
//         const tableHead = document.getElementById('attendanceTableHead');
//         container.innerHTML = ''; // Clear previous content
//         tableHead.innerHTML = ''; // Clear the existing header content

//         if (!records || records.length === 0) {
//             displayNoRecordsMessage();
//             return;
//         }

//         // Create the header with dates as columns
//         const headerRow = document.createElement('tr');
//         headerRow.innerHTML = `<th class="fixed-column">Date</th><th class="fixed-column">Status</th>`;
//         tableHead.appendChild(headerRow);

//         // Iterate through the records to display the student's attendance status
//         records.forEach(record => {
//             const row = document.createElement('tr');
//             row.classList.add('attendance-row');

//             row.innerHTML = `
//                 <td class="fixed-column">${new Date(record.date).toLocaleDateString()}</td>
//                 <td class="fixed-column">${record.present || 'Absent'}</td>
//             `;

//             container.appendChild(row);
//         });
//     }

//     // Function to filter records based on selected date
//     document.getElementById('specificDate').addEventListener('change', function () {
//         const selectedDate = new Date(document.getElementById('specificDate').value).toLocaleDateString();

//         if (!selectedDate) return; // Exit if no date is selected

//         // Filter records by selected date
//         const filteredRecords = originalData.filter(record => new Date(record.date).toLocaleDateString() === selectedDate);

//         if (filteredRecords.length > 0) {
//             displayAttendanceRecords(filteredRecords);
//         } else {
//             displayNoRecordsMessage(); // Show no records message if no records match the selected date
//         }
//     });

//     // Function to calculate and display attendance percentage (if needed)
//     function calculateAttendancePercentage(records) {
//         const totalDays = records.length; // Total days for which records are available
//         const presentDays = records.filter(record => record.present === 'Present').length; // Number of days present
//         const percentage = (presentDays / totalDays) * 100;

//         // Display percentage in the UI (if required)
//         const percentageElement = document.getElementById('attendance-percentage');
//         if (percentageElement) {
//             percentageElement.innerText = `Attendance Percentage: ${percentage.toFixed(2)}%`;
//         }
//     }

//     // Display a message when no records are found
//     function displayNoRecordsMessage() {
//         const container = document.getElementById('attendanceResultsContainer');
//         container.innerHTML = '<tr><td colspan="2" class="text-center text-danger">No attendance records found for this subject and semester.</td></tr>';
//     }

//     // Refresh button to reload the page
//     document.getElementById('refreshButton').addEventListener('click', function () {
//         location.reload();
//     });
// });











// // Retrieve the subjectId, semester, and identifier from the URL
// const params = new URLSearchParams(window.location.search);
// const subjectId = params.get('subjectId'); // Subject ID
// const semester = params.get('semester'); // Semester
// const identifier = params.get('identifier'); // College ID

// // Debug: Check if the values are correctly captured
// console.log('Subject ID:', subjectId);
// console.log('Semester:', semester);
// console.log('College ID (identifier):', identifier);

// // If any parameter is missing, redirect to login page or show error
// if (!subjectId || !semester || !identifier) {
//     alert('Student identifier or semester is missing. Please log in again.');
//     window.location.href = '../html/index.html'; // Redirect to login page
//     throw new Error('Missing parameters'); // Ensure script execution stops
// }

// // Display student attendance records for the selected subject
// async function loadStudentAttendance() {
//     try {
//         // Construct the URL to fetch attendance data for the student and subject
//         const url = `http://localhost:5000/view-student-attendance/${semester}/${subjectId}/${identifier}`;
//         console.log('Fetching attendance records from URL:', url);

//         // Fetch attendance data from server
//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.success) {
//             displayAttendanceRecords(data.attendanceRecords);
//         } else {
//             displayNoRecordsMessage(); // Show no records message if no data is found
//             console.error('Failed to fetch attendance records:', data.message);
//         }
//     } catch (error) {
//         displayNoRecordsMessage(); // Show no records message on error
//         console.error('Error fetching attendance records:', error);
//     }
// }

// // Function to display attendance records in the table
// function displayAttendanceRecords(records) {
//     const container = document.getElementById('attendanceResultsContainer');
//     const tableHead = document.getElementById('attendanceTableHead');

//     // Clear any existing content in the table
//     container.innerHTML = '';
//     tableHead.innerHTML = '';

//     if (!records || records.length === 0) {
//         displayNoRecordsMessage();
//         return; // Stop execution if no records are found
//     }

//     // Create the table headers for date and status
//     const headerRow = document.createElement('tr');
//     headerRow.innerHTML = `<th>Date</th><th>Status</th>`;
//     tableHead.appendChild(headerRow);

//     // Populate the table with attendance records
//     records.forEach(record => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${new Date(record.date).toLocaleDateString()}</td>
//             <td>${record.status}</td>
//         `;
//         container.appendChild(row);
//     });
// }

// // Function to display a message when no attendance records are found
// function displayNoRecordsMessage() {
//     const container = document.getElementById('attendanceResultsContainer');
//     container.innerHTML = '<tr><td colspan="2" class="text-center text-danger">No attendance records found for this subject and semester.</td></tr>';
// }

// // Load attendance records on page load
// window.onload = loadStudentAttendance;


// document.addEventListener('DOMContentLoaded', function () {
//     // Retrieve query parameters from the URL
//     const params = new URLSearchParams(window.location.search);
//     const subjectId = params.get('subjectId');
//     const semester = params.get('semester');
//     const identifier = params.get('identifier'); // College ID
    

//     // Check if required parameters are present
//     if (!subjectId || !semester || !identifier) {
//         alert('Student identifier or semester is missing. Please log in again.');
//         window.location.href = '../html/index.html'; // Redirect to login page if parameters are missing
//         return;
//     }

//     // Set the subject name on the page
//     const subjectNameElement = document.getElementById('subject-name');
//     if (subjectNameElement) {
//         subjectNameElement.innerText = subjectId; // Set the subject ID in the span element
//     } else {
//         console.error("The 'subject-name' element is missing in the HTML structure.");
//     }

//     // Fetch attendance records from the server based on the subject and semester
//     fetch(`http://localhost:5000/view-student-attendance/${semester}/${subjectId}/${identifier}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 displayAttendanceRecords(data.attendanceRecords); // Call the function to display records
//             } else {
//                 displayNoRecordsMessage();
//                 console.error('Failed to fetch attendance records:', data.message);
//             }
//         })
//         .catch(error => {
//             displayNoRecordsMessage();
//             console.error('Error fetching attendance records:', error);
//         });

//     // Function to display attendance records in a table format
//     function displayAttendanceRecords(records) {
//         const container = document.getElementById('attendanceResultsContainer');
//         container.innerHTML = ''; // Clear previous content

//         if (!records || records.length === 0) {
//             displayNoRecordsMessage();
//             return;
//         }

//         // Loop through each record (each record represents a day)
//         records.forEach(record => {
//             const studentAttendance = record.attendance.find(student => student.collegeid === identifier);

//             if (studentAttendance) {
//                 const row = document.createElement('tr');
//                 const dateCell = document.createElement('td');
//                 const statusCell = document.createElement('td');

//                 // Set the date and status for the student
//                 dateCell.textContent = new Date(record.date).toLocaleDateString();
//                 statusCell.textContent = studentAttendance.present || 'Absent'; // Use 'Absent' if no status is provided

//                 row.appendChild(dateCell);
//                 row.appendChild(statusCell);
//                 container.appendChild(row);
//             }
//         });
//     }

//     // Function to display a message when no records are found
//     function displayNoRecordsMessage() {
//         const container = document.getElementById('attendanceResultsContainer');
//         container.innerHTML = '<tr><td colspan="2" class="text-center text-danger">No attendance records found for this subject and semester.</td></tr>';
//     }
// });









// current correct code
// document.addEventListener('DOMContentLoaded', function () {
//     // Retrieve query parameters from the URL
//     const params = new URLSearchParams(window.location.search);
//     const subjectId = params.get('subjectId');
//     const semester = params.get('semester');
//     const identifier = params.get('identifier'); // College ID
    

//     // Check if required parameters are present
//     if (!subjectId || !semester || !identifier) {
//         alert('Student identifier or semester is missing. Please log in again.');
//         window.location.href = '../html/index.html'; // Redirect to login page if parameters are missing
//         return;
//     }

//     // Set the subject name on the page
//     const subjectNameElement = document.getElementById('subject-name');
//     if (subjectNameElement) {
//         subjectNameElement.innerText = subjectId; // Set the subject ID in the span element
//     } else {
//         console.error("The 'subject-name' element is missing in the HTML structure.");
//     }

//     // Fetch attendance records from the server based on the subject and semester
//     fetch(`http://localhost:5000/view-student-attendance/${semester}/${subjectId}/${identifier}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 displayAttendanceRecords(data.attendanceRecords); // Call the function to display records
//             } else {
//                 displayNoRecordsMessage();
//                 console.error('Failed to fetch attendance records:', data.message);
//             }
//         })
//         .catch(error => {
//             displayNoRecordsMessage();
//             console.error('Error fetching attendance records:', error);
//         });

//     // Function to display attendance records in a table format
//     // Function to display attendance records in a table format
// function displayAttendanceRecords(records) {
//     const headerRow = document.getElementById('attendanceTableHead');
//     const bodyContainer = document.getElementById('attendanceResultsContainer');
//     bodyContainer.innerHTML = ''; // Clear previous content

//     if (!records || records.length === 0) {
//         displayNoRecordsMessage();
//         return;
//     }

//     // Clear existing headers and dynamically create the date columns
//     headerRow.innerHTML = ''; // Clear existing headers
//     let headerHTML = '<tr><th>Date</th>'; // Initialize header with a "Date" column

//     // Loop through records to create headers based on dates
//     records.forEach(record => {
//         headerHTML += `<th>${new Date(record.date).toLocaleDateString()}</th>`;
//     });
//     headerHTML += '</tr>';
//     headerRow.innerHTML = headerHTML; // Set the header row with dates

//     // Now create the row for attendance status
//     let attendanceRowHTML = '<tr><td>Attendance Status</td>'; // Initialize attendance row

//     records.forEach(record => {
//         const studentAttendance = record.attendance.find(student => student.collegeid === identifier);
//         const status = studentAttendance ? (studentAttendance.present ? 'Present' : 'Absent') : 'Absent';
//         attendanceRowHTML += `<td>${status}</td>`; // Append status for each date
//     });

//     attendanceRowHTML += '</tr>'; // Close the row
//     bodyContainer.innerHTML = attendanceRowHTML; // Append the row with attendance statuses
// }

    
//         });
    

//     // Function to display a message when no records are found
//     function displayNoRecordsMessage() {
//         const container = document.getElementById('attendanceResultsContainer');
//         container.innerHTML = '<tr><td colspan="2" class="text-center text-danger">No attendance records found for this subject and semester.</td></tr>';
//     }





document.addEventListener('DOMContentLoaded', function () {
    // Retrieve query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const subjectId = params.get('subjectId');
    const semester = params.get('semester');
    const identifier = params.get('identifier'); // College ID

    // Check if required parameters are present
    if (!subjectId || !semester || !identifier) {
        alert('Student identifier or semester is missing. Please log in again.');
        window.location.href = '../html/index.html'; // Redirect to login page if parameters are missing
        return;
    }

    // Set the subject name on the page
    const subjectNameElement = document.getElementById('subject-name');
    if (subjectNameElement) {
        subjectNameElement.innerText = subjectId; // Set the subject ID in the span element
    } else {
        console.error("The 'subject-name' element is missing in the HTML structure.");
    }

    // Fetch attendance records from the server based on the subject and semester
    fetch(`http://localhost:5000/view-student-attendance/${semester}/${subjectId}/${identifier}`)
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data); // Log fetched data
        if (data.success) {
            displayAttendanceRecords(data.attendanceRecords);
        } else {
            displayNoRecordsMessage();
            console.error('Failed to fetch attendance records:', data.message);
        }
    })
    .catch(error => {
        displayNoRecordsMessage();
        console.error('Error fetching attendance records:', error);
    });


    // Function to display attendance records in a table format with percentage calculation
    function displayAttendanceRecords(records) {
        const headerRow = document.getElementById('attendanceTableHead');
        const bodyContainer = document.getElementById('attendanceResultsContainer');
        bodyContainer.innerHTML = ''; // Clear previous content
    
        if (!records || records.length === 0) {
            displayNoRecordsMessage();
            return;
        }
    
        // Clear existing headers and dynamically create the date columns
        headerRow.innerHTML = ''; // Clear existing headers
        let headerHTML = '<tr><th>Date</th>'; // Initialize header with a "Date" column
    
        // Get the unique dates for which attendance was recorded
        const uniqueDates = [...new Set(records.map(record => new Date(record.date).toLocaleDateString()))];
        uniqueDates.forEach(date => {
            headerHTML += `<th>${date}</th>`;
        });
        headerHTML += '<th>Attendance Percentage</th></tr>'; // Add "Attendance Percentage" column
        headerRow.innerHTML = headerHTML; // Set the header row with dates
    
        // Now create the row for attendance status and percentage calculation
        let attendanceRowHTML = '<tr><td>Attendance Status</td>';
    
        // Count the number of total classes and number of days present
        let totalClasses = 0;
        let daysPresent = 0;
    
        
        // Loop through each record to calculate the total number of classes and present days
records.forEach(record => {
    // Find the student's attendance entry for the current record
    const studentAttendance = record.attendance.find(student => student.collegeid === identifier);
    
    // Check the attendance status based on the 'present' field
    let status = 'Absent'; // Default status
    if (studentAttendance) {
        // Check the attendance status as a string
        status = studentAttendance.present === 'Present' ? 'Present' : 'Absent'; // Check if the status is 'Present'
    }
    
    attendanceRowHTML += `<td>${status}</td>`; // Append status for each date
    totalClasses++;

    if (status === 'Present') {
        daysPresent++;
    }
});

    
        // Calculate attendance percentage
        const attendancePercentage = (daysPresent / totalClasses) * 100;
    
        // Append percentage column to the row
        attendanceRowHTML += `<td>${attendancePercentage.toFixed(2)}%</td></tr>`; // Round to 2 decimal places
        bodyContainer.innerHTML = attendanceRowHTML; // Append the row with attendance statuses
    }
    
    // Function to display a message when no records are found
    function displayNoRecordsMessage() {
        const container = document.getElementById('attendanceResultsContainer');
        container.innerHTML = '<tr><td colspan="2" class="text-center text-danger">No attendance records found for this subject and semester.</td></tr>';
    }
});
