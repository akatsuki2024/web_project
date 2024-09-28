
// document.addEventListener('DOMContentLoaded', function () {
//     let originalData = [];  // Store the original fetched data for filtering

//     const subjectCode = sessionStorage.getItem('selectedSubjectCode');
//     const semester = sessionStorage.getItem('selectedSemester');

//     if (!subjectCode || !semester) {
//         alert('Subject or semester information is missing. Please go back and select the subject again.');
//         window.location.href = '../html/teacher-page.html';
//         return;
//     }

//     // Fetch attendance data from the server based on the selected subject and semester
//     fetch(`http://localhost:5000/view-attendance/${semester}/${subjectCode}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 originalData = data.attendanceRecords;  // Store the fetched data for filtering
//                 displayAttendanceRecords(originalData);  // Display data initially
//             } else {
//                 displayNoRecordsMessage();
//                 console.error('Failed to fetch attendance records:', data.message);
//             }
//         })
//         .catch(error => {
//             displayNoRecordsMessage();
//             console.error('Error fetching attendance records:', error);
//         });

//     // Function to display attendance records in the table
//     function displayAttendanceRecords(records) {
//         const container = document.getElementById('attendanceResultsContainer');
//         container.innerHTML = ''; // Clear previous content

//         if (!records || records.length === 0) {
//             displayNoRecordsMessage();
//             return;
//         }

//         const groupedRecords = groupRecordsByStudent(records);

//         Object.keys(groupedRecords).forEach(rollNo => {
//             const student = groupedRecords[rollNo];
//             const row = document.createElement('tr');
//             row.classList.add('student-row');
//             row.innerHTML = `
//                 <td>${rollNo}</td>
//                 <td>${student.name}</td>
//                 <td>
//                     <ul>
//                         ${student.attendance.map(record => `<li>${record.date}: ${record.status}</li>`).join('')}
//                     </ul>
//                 </td>
//             `;
//             container.appendChild(row);
//         });
//     }

//     // Function to group records by student
//     function groupRecordsByStudent(records) {
//         return records.reduce((acc, record) => {
//             record.attendance.forEach(studentRecord => {
//                 const rollNo = studentRecord.rollno;
//                 if (!acc[rollNo]) {
//                     acc[rollNo] = { name: studentRecord.name, attendance: [] };
//                 }
//                 acc[rollNo].attendance.push({
//                     date: new Date(record.date).toLocaleDateString(),
//                     status: studentRecord.present || "Absent"
//                 });
//             });
//             return acc;
//         }, {});
//     }

//     // Display a message when no records are found
//     function displayNoRecordsMessage() {
//         const container = document.getElementById('attendanceResultsContainer');
//         container.innerHTML = '<tr><td colspan="3" class="text-center text-danger">No attendance records found for this subject and semester.</td></tr>';
//     }

//     // Search by Roll No
//     document.getElementById('searchButton').addEventListener('click', function () {
//         const searchValue = document.getElementById('searchRollNo').value.trim().toLowerCase();
        
//         // Filter the original data based on the roll number search
//         const filteredRecords = originalData
//             .map(record => ({
//                 date: record.date,
//                 attendance: record.attendance.filter(student => student.rollno.toLowerCase() === searchValue)
//             }))
//             .filter(record => record.attendance.length > 0);

//         displayAttendanceRecords(filteredRecords);
//     });

//     // Filter by Date
//     document.getElementById('specificDate').addEventListener('change', function () {
//         const selectedDate = new Date(document.getElementById('specificDate').value);
//         if (isNaN(selectedDate.getTime())) return;  // Invalid date, exit

//         const filteredRecords = originalData.filter(record =>
//             new Date(record.date).toLocaleDateString() === selectedDate.toLocaleDateString()
//         );
//         displayAttendanceRecords(filteredRecords);
//     });

//     // Export table data to Excel
//     document.getElementById('exportButton').addEventListener('click', function () {
//         const table = document.querySelector('table');
//         const wb = XLSX.utils.table_to_book(table, { sheet: "Attendance Data" });
//         XLSX.writeFile(wb, 'AttendanceData.xlsx');
//     });
// });






























// ------------------------------------------------------------------------------



document.addEventListener('DOMContentLoaded', function () {
    let originalData = []; // Store the original fetched data for filtering
    let defaulterData = []; // Store defaulters data separately

    const subjectCode = sessionStorage.getItem('selectedSubjectCode');
    const semester = sessionStorage.getItem('selectedSemester');

    if (!subjectCode || !semester) {
        alert('Subject or semester information is missing. Please go back and select the subject again.');
        window.location.href = '../html/teacher-page.html';
        return;
    }

    // Fetch attendance data from the server based on the selected subject and semester
    fetch(`http://localhost:5000/view-attendance/${semester}/${subjectCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                originalData = data.attendanceRecords; // Store the fetched data for filtering
                displayAttendanceRecords(originalData); // Display data initially
                calculateAttendancePercentage(originalData); // Calculate percentage after data is fetched
            } else {
                displayNoRecordsMessage();
                console.error('Failed to fetch attendance records:', data.message);
            }
        })
        .catch(error => {
            displayNoRecordsMessage();
            console.error('Error fetching attendance records:', error);
        });

    // Function to display attendance records in a table format similar to Excel
    function displayAttendanceRecords(records) {
        const container = document.getElementById('attendanceResultsContainer');
        const tableHead = document.getElementById('attendanceTableHead');
        container.innerHTML = ''; // Clear previous content
        tableHead.innerHTML = ''; // Clear the existing header content

        if (!records || records.length === 0) {
            displayNoRecordsMessage();
            return;
        }

        // Create the header with dates as columns
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `<th>Roll No</th><th>Name</th>`; // Fixed headers for Roll No and Name
        const uniqueDates = [...new Set(records.map(record => new Date(record.date).toLocaleDateString()))]; // Extract unique dates

        uniqueDates.forEach(date => {
            const dateHeader = document.createElement('th');
            dateHeader.textContent = date; // Add each date as a column header
            headerRow.appendChild(dateHeader);
        });
        headerRow.innerHTML += `<th>Attendance Percentage</th>`; // Add Percentage column
        tableHead.appendChild(headerRow);

        // Group records by student
        const groupedRecords = groupRecordsByStudent(records);

        Object.keys(groupedRecords).forEach(rollNo => {
            const student = groupedRecords[rollNo];
            const row = document.createElement('tr');
            row.classList.add('student-row');

            // Create a cell for Roll No and Name
            row.innerHTML = `
                <td>${rollNo}</td>
                <td>${student.name}</td>
            `;

            // Create cells for each date (mark Present/Absent)
            uniqueDates.forEach(date => {
                const attendanceRecord = student.attendance.find(att => att.date === date);
                const statusCell = document.createElement('td');
                statusCell.textContent = attendanceRecord ? attendanceRecord.status : "Absent";
                row.appendChild(statusCell);
            });

            // Add attendance percentage cell
            const percentageCell = document.createElement('td');
            percentageCell.classList.add('attendance-percentage');
            percentageCell.textContent = student.percentage ? student.percentage.toFixed(2) + "%" : "N/A";
            percentageCell.style.color = student.percentage < 75 ? 'red' : 'black';
            row.appendChild(percentageCell);

            container.appendChild(row);
        });
    }

    // Function to group records by student and calculate attendance percentage
    function groupRecordsByStudent(records) {
        const totalDays = records.length;
        const grouped = records.reduce((acc, record) => {
            record.attendance.forEach(studentRecord => {
                const rollNo = studentRecord.rollno;
                if (!acc[rollNo]) {
                    acc[rollNo] = { name: studentRecord.name, attendance: [], presentDays: 0 };
                }
                acc[rollNo].attendance.push({
                    date: new Date(record.date).toLocaleDateString(),
                    status: studentRecord.present || "Absent"
                });
                if (studentRecord.present === "Present") {
                    acc[rollNo].presentDays++;
                }
            });
            return acc;
        }, {});

        Object.keys(grouped).forEach(rollNo => {
            grouped[rollNo].percentage = (grouped[rollNo].presentDays / totalDays) * 100;
            if (grouped[rollNo].percentage < 75) {
                defaulterData.push({ rollNo, ...grouped[rollNo] }); // Add to defaulters list if below 75%
            }
        });
        return grouped;
    }

    // Function to calculate attendance percentage (to fix the missing function issue)
    function calculateAttendancePercentage(records) {
        const grouped = groupRecordsByStudent(records);
        const rows = document.querySelectorAll('.student-row');
        rows.forEach(row => {
            const rollNo = row.children[0].innerText.trim();
            const student = grouped[rollNo];
            if (student && student.percentage < 75) {
                row.style.color = 'red'; // Highlight rows for students with percentage < 75%
            }
        });
    }

    // Display a message when no records are found
    function displayNoRecordsMessage() {
        const container = document.getElementById('attendanceResultsContainer');
        container.innerHTML = '<tr><td colspan="4" class="text-center text-danger">No attendance records found for this subject and semester.</td></tr>';
    }

    // Search by Roll No
    document.getElementById('searchButton').addEventListener('click', function () {
        const searchValue = document.getElementById('searchRollNo').value.trim().toLowerCase();

        // Filter the original data based on the roll number search
        const filteredRecords = originalData
            .map(record => ({
                date: record.date,
                attendance: record.attendance.filter(student => student.rollno.toLowerCase() === searchValue)
            }))
            .filter(record => record.attendance.length > 0);

        displayAttendanceRecords(filteredRecords);
    });

    // Filter by Date
    document.getElementById('specificDate').addEventListener('change', function () {
        const selectedDate = new Date(document.getElementById('specificDate').value);
        if (isNaN(selectedDate.getTime())) return; // Invalid date, exit

        const filteredRecords = originalData.filter(record =>
            new Date(record.date).toLocaleDateString() === selectedDate.toLocaleDateString()
        );
        displayAttendanceRecords(filteredRecords);
    });

    // View Defaulter List
    document.getElementById('viewDefaulterButton').addEventListener('click', function () {
        displayDefaulterRecords(); // Display only defaulters
    });

    // Export table data to Excel
    document.getElementById('exportButton').addEventListener('click', function () {
        const table = document.querySelector('table');
        const wb = XLSX.utils.table_to_book(table, { sheet: "Attendance Data" });
        XLSX.writeFile(wb, 'AttendanceData.xlsx');
    });

    // Export Defaulter List to Excel
    document.getElementById('exportDefaulterButton').addEventListener('click', function () {
        const container = document.createElement('table');
        container.innerHTML = `
            <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Attendance Percentage</th>
            </tr>
        `;

        defaulterData.forEach(defaulter => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${defaulter.rollNo}</td>
                <td>${defaulter.name}</td>
                <td>${defaulter.percentage.toFixed(2)}%</td>
            `;
            container.appendChild(row);
        });

        const wb = XLSX.utils.table_to_book(container, { sheet: "Defaulter List" });
        XLSX.writeFile(wb, 'DefaulterList.xlsx');
    });
});



//------------------------------------------------------------------------