// document.addEventListener('DOMContentLoaded', function () {
//     // Get the logged-in teacher's username from sessionStorage (set after login)
//     const username = sessionStorage.getItem('username');  // Ensure username is stored in session after login
    
//     if (username) {
//         // Fetch teacher subjects from the server using the username
//         fetch(`http://localhost:5000/get-teacher-subjects/${username}`)
//             .then(response => response.json())
//             .then(data => {
//                 const subjectContainer = document.getElementById('subject-container');
                
//                 if (data.success && data.subjects && Object.keys(data.subjects).length > 0) {
//                     // Clear any previous content in the container
//                     subjectContainer.innerHTML = '';
                    
//                     // Get the subjects from the response
//                     const subjects = data.subjects;
                    
//                     // Loop over the subjects and dynamically create buttons
//                     Object.keys(subjects).forEach(sem => {
//                         const subject = subjects[sem];

//                         // Create the subject button with subject code and name
//                         const subjectButton = document.createElement('button');
//                         subjectButton.innerHTML = `${subject.code} - ${subject.name}`;
//                         subjectButton.className = 'subject-button';
                        
//                         // Append the subject button to the container
//                         subjectContainer.appendChild(subjectButton);
//                     });
//                 } else {
//                     // Display a message if no subjects are found
//                     subjectContainer.innerHTML = "<p>No subjects found for this teacher.</p>";
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching subjects:', error);
//                 document.getElementById('subject-container').innerHTML = "<p>Unable to fetch subjects at the moment. Please try again later.</p>";
//             });
//     } else {
//         console.error('No username found in session storage');
//         document.getElementById('subject-container').innerHTML = "<p>Error: No user session found. Please log in again.</p>";
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    // Get the logged-in teacher's username from sessionStorage (set after login)
    const username = sessionStorage.getItem('username'); // Ensure username is stored in session after login

    // Check if the username is available in sessionStorage
    if (username) {
        // Fetch teacher subjects from the server using the username
        fetch(`http://localhost:5000/get-teacher-subjects/${username}`)
            .then(response => response.json())
            .then(data => {
                const subjectContainer = document.getElementById('subject-container');

                // Check if the data retrieval was successful and subjects are available
                if (data.success && data.subjects && Object.keys(data.subjects).length > 0) {
                    // Clear any previous content in the container
                    subjectContainer.innerHTML = '';

                    // Loop over the subjects and dynamically create buttons
                    Object.keys(data.subjects).forEach(sem => {
                        const subject = data.subjects[sem];

                        // Create the subject button with subject code and name
                        const subjectButton = document.createElement('button');
                        subjectButton.innerHTML = `${subject.code} - ${subject.name}`;
                        subjectButton.className = 'subject-button';

                        // Store semester and subject info in button attributes
                        subjectButton.dataset.semester = sem;
                        subjectButton.dataset.code = subject.code;
                        subjectButton.dataset.name = subject.name;

                        // Append the subject button to the container
                        subjectContainer.appendChild(subjectButton);

                        // Add click event listener to navigate to the attendance marking page
                        subjectButton.addEventListener('click', function () {
                            // Store selected subject data in session storage
                            sessionStorage.setItem('selectedSemester', this.dataset.semester);
                            sessionStorage.setItem('selectedSubjectCode', this.dataset.code);
                            sessionStorage.setItem('selectedSubjectName', this.dataset.name);

                            // Navigate to the attendance marking page with a relative URL path
                            window.location.href = '../html/attendance-mark.html';
                        });
                    });
                } else {
                    // Display a message if no subjects are found
                    subjectContainer.innerHTML = "<p>No subjects found for this teacher.</p>";
                }
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
                document.getElementById('subject-container').innerHTML = "<p>Unable to fetch subjects at the moment. Please try again later.</p>";
            });
    } else {
        // Error message if no username is found in session storage
        console.error('No username found in session storage');
        document.getElementById('subject-container').innerHTML = "<p>Error: No user session found. Please log in again.</p>";
    }
});
