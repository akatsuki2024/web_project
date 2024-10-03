// $(document).ready(function () {
//     const phoneRegex = /^\d{10}$/;
//     const emailRegex = /^[a-zA-Z0-9._$]+@kccemsr\.edu\.in$/;

//     const subjects = {
//         "III": {
//             compulsory: [
//                 {"id": "ITC301", "name": "Engineering Mathematics-III"},
//                 {"id": "ITC302", "name": "Data Structure and Analysis"},
//                 {"id": "ITC303", "name": "Database Management System"},
//                 {"id": "ITC304", "name": "Principle of Communication"},
//                 {"id": "ITC305", "name": "Paradigms and Computer Programming Fundamentals"}
//             ],
//             optional: []
//         },
//         "IV": {
//             compulsory: [
//                 {"id": "ITC401", "name": "Engineering Mathematics-IV"},
//                 {"id": "ITC402", "name": "Computer Network and Network Design"},
//                 {"id": "ITC403", "name": "Operating System"},
//                 {"id": "ITC404", "name": "Automata Theory"},
//                 {"id": "ITC405", "name": "Computer Organization and Architecture"}
//             ],
//             optional: []
//         },
//         "V": {
//             compulsory: [
//                 {"id": "ITC501", "name": "Internet Programming"},
//                 {"id": "ITC502", "name": "Computer Network Security"},
//                 {"id": "ITC503", "name": "Entrepreneurship and E-business"},
//                 {"id": "ITC504", "name": "Software Engineering"}
//             ],
//             optional: [
//                 {"id": "ITDO5012", "name": "Advance Data Management Technologies"},
//                 {"id": "ITDO5014", "name": "Advanced Data Structure and Analysis"}
//             ]
//         },
//         "VI": {
//             compulsory: [
//                 {"id": "ITC601", "name": "Data Mining & Business Intelligence"},
//                 {"id": "ITC602", "name": "Web X.0"},
//                 {"id": "ITC603", "name": "Wireless Technology"},
//                 {"id": "ITC604", "name": "AI and DS – 1"}
//             ],
//             optional: [
//                 {"id": "ITDO6011", "name": "Software Architecture"},
//                 {"id": "ITDO6012", "name": "Image Processing"},
//                 {"id": "ITDO6013", "name": "Green IT"},
//                 {"id": "ITDO6014", "name": "Ethical Hacking and Forensic"}
//             ]
//         },
//         "VII": {
//             compulsory: [
//                 {"id": "ITC701", "name": "AI and DS – II"},
//                 {"id": "ITC702", "name": "Internet of Everything"}
//             ],
//             optional: {
//                 department: [
//                     {"id": "ITDO7011", "name": "Storage Area Network"},
//                     {"id": "ITDO7012", "name": "High-Performance Computing"},
//                     {"id": "ITDO7013", "name": "Infrastructure Security"},
//                     {"id": "ITDO7014", "name": "Software Testing and QA"}
//                 ],
//                 institute: [
//                     {"id": "ILO7011", "name": "Product Lifecycle Management"},
//                     {"id": "ILO7012", "name": "Reliability Engineering"},
//                     {"id": "ILO7013", "name": "Management Information System"}
//                 ]
//             }
//         },
//         "VIII": {
//             compulsory: [
//                 {"id": "ITC801", "name": "Big Data Analytics"},
//                 {"id": "ITC802", "name": "Internet of Everything"}
//             ],
//             optional: {
//                 department: [
//                     {"id": "ITDLO8041", "name": "User Interaction Design"},
//                     {"id": "ITDLO8042", "name": "Information Retrieval Systems"},
//                     {"id": "ITDLO8043", "name": "Knowledge Management"},
//                     {"id": "ITDLO8044", "name": "Robotics"}
//                 ],
//                 institute: [
//                     {"id": "ILO8021", "name": "Project Management"},
//                     {"id": "ILO8022", "name": "Finance Management"},
//                     {"id": "ILO8023", "name": "Entrepreneurship Development and Management"}
//                 ]
//             }
//         }
//     };

//     // Handle semester change
//     $('#sem').change(function () {
//         const selectedSem = $(this).val();
//         const compulsoryContainer = $('#compulsory-subjects-container');
//         const optionalContainer = $('#optional-subjects-container');
//         compulsoryContainer.empty();
//         optionalContainer.empty();

//         if (selectedSem && subjects[selectedSem]) {
//             // Populate compulsory subjects
//             compulsoryContainer.append('<h3>Compulsory Subjects:</h3>');
//             subjects[selectedSem].compulsory.forEach(subject => {
//                 compulsoryContainer.append(`<p>${subject.id} - ${subject.name}</p>`);
//             });

//             // Handle optional subjects for Semester V and VI
//             if (selectedSem === "V" || selectedSem === "VI") {
//                 optionalContainer.append('<h4>Select Department Level Subject:</h4>');
//                 optionalContainer.append('<select id="department-optional" name="department-optional" required><option value="" disabled selected>Select Department Level Subject</option></select>');
//                 subjects[selectedSem].optional.forEach(subject => {
//                     $('#department-optional').append(`<option value="${subject.id}">${subject.name}</option>`);
//                 });
//             }

//             // Special handling for Semester VII and VIII
//             if (selectedSem === "VII" || selectedSem === "VIII") {
//                 optionalContainer.append('<h4>Select Department Level Subjects:</h4>');
//                 optionalContainer.append('<select id="department-optional1" name="department-optional1" required><option value="" disabled selected>Select Department Level Subject 1</option></select>');
//                 optionalContainer.append('<select id="department-optional2" name="department-optional2" required><option value="" disabled selected>Select Department Level Subject 2</option></select>');
                
//                 subjects[selectedSem].optional.department.forEach(subject => {
//                     $('#department-optional1').append(`<option value="${subject.id}">${subject.name}</option>`);
//                     $('#department-optional2').append(`<option value="${subject.id}">${subject.name}</option>`);
//                 });

//                 $('#department-optional1').change(function () {
//                     const selectedValue = $(this).val();
//                     $('#department-optional2 option').prop('disabled', false); // Re-enable all options initially
//                     $('#department-optional2 option[value="' + selectedValue + '"]').prop('disabled', true); // Disable the selected one
//                 });

//                 $('#department-optional2').change(function () {
//                     const selectedValue = $(this).val();
//                     $('#department-optional1 option').prop('disabled', false); // Re-enable all options initially
//                     $('#department-optional1 option[value="' + selectedValue + '"]').prop('disabled', true); // Disable the selected one
//                 });

//                 optionalContainer.append('<h4>Select Institute Level Subject:</h4>');
//                 optionalContainer.append('<select id="institute-optional" name="institute-optional" required><option value="" disabled selected>Select Institute Level Subject</option></select>');
//                 subjects[selectedSem].optional.institute.forEach(subject => {
//                     $('#institute-optional').append(`<option value="${subject.id}">${subject.name}</option>`);
//                 });
//             }
//         }
//     });

//     // Validate phone number
//     $('#phoneno').on('input', function () {
//         const phoneNo = $(this).val();
//         const errorElement = $('#phoneno-error');

//         if (!/^\d*$/.test(phoneNo)) {
//             errorElement.text('Phone number can only contain digits.').addClass('active');
//             disableRegisterButton();
//         } else if (!phoneRegex.test(phoneNo)) {
//             errorElement.text('Phone number must be exactly 10 digits.').addClass('active');
//             disableRegisterButton();
//         } else {
//             errorElement.removeClass('active');
//             enableRegisterButtonIfValid();
//         }
//     });

//     // Validate college ID
//     $('#collegeid').on('input', function () {
//         const collegeID = $(this).val();
//         const errorElement = $('#collegeid-error');

//         if (!emailRegex.test(collegeID)) {
//             errorElement.text('College ID must end with @kccemsr.edu.in').addClass('active');
//             disableRegisterButton();
//         } else {
//             errorElement.removeClass('active');
//             enableRegisterButtonIfValid();
//         }
//     });

//     // Validate password matching
//     $('#confirmpassword').on('input', function () {
//         const password = $('#password').val();
//         const confirmPassword = $(this).val();
//         const errorElement = $('#password-error');

//         if (password !== confirmPassword) {
//             errorElement.text('Passwords do not match.').addClass('active');
//             disableRegisterButton();
//         } else {
//             errorElement.removeClass('active');
//             enableRegisterButtonIfValid();
//         }
//     });

//     // Check all fields for validation before enabling the register button
//     function enableRegisterButtonIfValid() {
//         const isValidPhone = phoneRegex.test($('#phoneno').val());
//         const isValidEmail = emailRegex.test($('#collegeid').val());
//         const isPasswordMatch = $('#password').val() === $('#confirmpassword').val();
//         const areRequiredFieldsFilled = $('#username').val() && $('#fullname').val() && $('#address').val() && $('#rollno').val() && $('#sem').val();

//         if (isValidPhone && isValidEmail && isPasswordMatch && areRequiredFieldsFilled) {
//             $('#register-btn').removeAttr('disabled');
//         }
//     }

//     function disableRegisterButton() {
//         $('#register-btn').attr('disabled', true);
//     }

//     // Initially disable the register button if fields are not filled
//     disableRegisterButton();

//     // Handle form submission
//     $('#student-register-form').submit(function (event) {
//         event.preventDefault();

//         const formData = $(this).serializeArray();  // Serialize the form data
//         const selectedSem = $('#sem').val();
//         let selectedSubjects = [];

//         // Collect compulsory subjects
//         subjects[selectedSem].compulsory.forEach(subject => {
//             selectedSubjects.push({ id: subject.id, name: subject.name });
//         });

//         // Collect optional subjects (if any)
//         if (selectedSem === "V" || selectedSem === "VI") {
//             const optionalSubject = $('#department-optional').val();
//             const subject = subjects[selectedSem].optional.find(opt => opt.id === optionalSubject);
//             if (subject) {
//                 selectedSubjects.push({ id: subject.id, name: subject.name });
//             }
//         } else if (selectedSem === "VII" || selectedSem === "VIII") {
//             const departmentOptional1 = $('#department-optional1').val();
//             const departmentOptional2 = $('#department-optional2').val();
//             const instituteOptional = $('#institute-optional').val();

//             const dept1 = subjects[selectedSem].optional.department.find(opt => opt.id === departmentOptional1);
//             const dept2 = subjects[selectedSem].optional.department.find(opt => opt.id === departmentOptional2);
//             const institute = subjects[selectedSem].optional.institute.find(opt => opt.id === instituteOptional);

//             if (dept1) selectedSubjects.push({ id: dept1.id, name: dept1.name });
//             if (dept2) selectedSubjects.push({ id: dept2.id, name: dept2.name });
//             if (institute) selectedSubjects.push({ id: institute.id, name: institute.name });
//         }

//         // Add selected subjects to form data
//         formData.push({ name: 'subjects', value: JSON.stringify(selectedSubjects) });

//         // Send form data via AJAX
//         $.ajax({
//             type: 'POST',
//             url: 'http://127.0.0.1:5000/register-student',
//             data: $.param(formData),  // Serialize formData object
//             success: function (response) {
//                 alert(response.message);
//             },
//             error: function () {
//                 alert("Error in registration");
//             }
//         });
//     });
// });





























// $(document).ready(function () {
//     const phoneRegex = /^\d{10}$/;
//     const emailRegex = /^[a-zA-Z0-9._$]+@kccemsr\.edu\.in$/;

//     // Subjects data remains unchanged
//     const subjects = {
//         "III": {
//             compulsory: [
//                 {"id": "ITC301", "name": "Engineering Mathematics-III"},
//                 {"id": "ITC302", "name": "Data Structure and Analysis"},
//                 {"id": "ITC303", "name": "Database Management System"},
//                 {"id": "ITC304", "name": "Principle of Communication"},
//                 {"id": "ITC305", "name": "Paradigms and Computer Programming Fundamentals"}
//             ],
//             optional: []
//         },
//         "IV": {
//             compulsory: [
//                 {"id": "ITC401", "name": "Engineering Mathematics-IV"},
//                 {"id": "ITC402", "name": "Computer Network and Network Design"},
//                 {"id": "ITC403", "name": "Operating System"},
//                 {"id": "ITC404", "name": "Automata Theory"},
//                 {"id": "ITC405", "name": "Computer Organization and Architecture"}
//             ],
//             optional: []
//         },
//         "V": {
//             compulsory: [
//                 {"id": "ITC501", "name": "Internet Programming"},
//                 {"id": "ITC502", "name": "Computer Network Security"},
//                 {"id": "ITC503", "name": "Entrepreneurship and E-business"},
//                 {"id": "ITC504", "name": "Software Engineering"}
//             ],
//             optional: [
//                 {"id": "ITDO5012", "name": "Advance Data Management Technologies"},
//                 {"id": "ITDO5014", "name": "Advanced Data Structure and Analysis"}
//             ]
//         },
//         "VI": {
//             compulsory: [
//                 {"id": "ITC601", "name": "Data Mining & Business Intelligence"},
//                 {"id": "ITC602", "name": "Web X.0"},
//                 {"id": "ITC603", "name": "Wireless Technology"},
//                 {"id": "ITC604", "name": "AI and DS – 1"}
//             ],
//             optional: [
//                 {"id": "ITDO6011", "name": "Software Architecture"},
//                 {"id": "ITDO6012", "name": "Image Processing"},
//                 {"id": "ITDO6013", "name": "Green IT"},
//                 {"id": "ITDO6014", "name": "Ethical Hacking and Forensic"}
//             ]
//         },
//         "VII": {
//             compulsory: [
//                 {"id": "ITC701", "name": "AI and DS – II"},
//                 {"id": "ITC702", "name": "Internet of Everything"}
//             ],
//             optional: {
//                 department: [
//                     {"id": "ITDO7011", "name": "Storage Area Network"},
//                     {"id": "ITDO7012", "name": "High-Performance Computing"},
//                     {"id": "ITDO7013", "name": "Infrastructure Security"},
//                     {"id": "ITDO7014", "name": "Software Testing and QA"}
//                 ],
//                 institute: [
//                     {"id": "ILO7011", "name": "Product Lifecycle Management"},
//                     {"id": "ILO7012", "name": "Reliability Engineering"},
//                     {"id": "ILO7013", "name": "Management Information System"}
//                 ]
//             }
//         },
//         "VIII": {
//             compulsory: [
//                 {"id": "ITC801", "name": "Big Data Analytics"},
//                 {"id": "ITC802", "name": "Internet of Everything"}
//             ],
//             optional: {
//                 department: [
//                     {"id": "ITDLO8041", "name": "User Interaction Design"},
//                     {"id": "ITDLO8042", "name": "Information Retrieval Systems"},
//                     {"id": "ITDLO8043", "name": "Knowledge Management"},
//                     {"id": "ITDLO8044", "name": "Robotics"}
//                 ],
//                 institute: [
//                     {"id": "ILO8021", "name": "Project Management"},
//                     {"id": "ILO8022", "name": "Finance Management"},
//                     {"id": "ILO8023", "name": "Entrepreneurship Development and Management"}
//                 ]
//             }
//         }
//     };

//     // Function to validate if username, college ID, or roll number already exists in the selected semester
//     function validateExistingAttributes(attributeType, attributeValue, callback) {
//         const selectedSem = $('#sem').val();
//         if (!selectedSem) return;

//         // Perform an AJAX request to check if the attribute already exists in the database
//         $.ajax({
//             url: `http://127.0.0.1:5000/check-attribute/${selectedSem}/${attributeType}/${attributeValue}`,
//             type: 'GET',
//             success: function (response) {
//                 callback(response.exists);
//             },
//             error: function () {
//                 console.error(`Error checking ${attributeType} in database.`);
//                 callback(false);
//             }
//         });
//     }

//     // Handle semester change
//     $('#sem').change(function () {
//         const selectedSem = $(this).val();
//         const compulsoryContainer = $('#compulsory-subjects-container');
//         const optionalContainer = $('#optional-subjects-container');
//         compulsoryContainer.empty();
//         optionalContainer.empty();

//         if (selectedSem && subjects[selectedSem]) {
//             // Populate compulsory subjects
//             compulsoryContainer.append('<h3>Compulsory Subjects:</h3>');
//             subjects[selectedSem].compulsory.forEach(subject => {
//                 compulsoryContainer.append(`<p>${subject.id} - ${subject.name}</p>`);
//             });

//             // Handle optional subjects for Semester V and VI
//             if (selectedSem === "V" || selectedSem === "VI") {
//                 optionalContainer.append('<h4>Select Department Level Subject:</h4>');
//                 optionalContainer.append('<select id="department-optional" name="department-optional" required><option value="" disabled selected>Select Department Level Subject</option></select>');
//                 subjects[selectedSem].optional.forEach(subject => {
//                     $('#department-optional').append(`<option value="${subject.id}">${subject.name}</option>`);
//                 });
//             }

//             // Special handling for Semester VII and VIII
//             if (selectedSem === "VII" || selectedSem === "VIII") {
//                 optionalContainer.append('<h4>Select Department Level Subjects:</h4>');
//                 optionalContainer.append('<select id="department-optional1" name="department-optional1" required><option value="" disabled selected>Select Department Level Subject 1</option></select>');
//                 optionalContainer.append('<select id="department-optional2" name="department-optional2" required><option value="" disabled selected>Select Department Level Subject 2</option></select>');
                
//                 subjects[selectedSem].optional.department.forEach(subject => {
//                     $('#department-optional1').append(`<option value="${subject.id}">${subject.name}</option>`);
//                     $('#department-optional2').append(`<option value="${subject.id}">${subject.name}</option>`);
//                 });

//                 $('#department-optional1').change(function () {
//                     const selectedValue = $(this).val();
//                     $('#department-optional2 option').prop('disabled', false); // Re-enable all options initially
//                     $('#department-optional2 option[value="' + selectedValue + '"]').prop('disabled', true); // Disable the selected one
//                 });

//                 $('#department-optional2').change(function () {
//                     const selectedValue = $(this).val();
//                     $('#department-optional1 option').prop('disabled', false); // Re-enable all options initially
//                     $('#department-optional1 option[value="' + selectedValue + '"]').prop('disabled', true); // Disable the selected one
//                 });

//                 optionalContainer.append('<h4>Select Institute Level Subject:</h4>');
//                 optionalContainer.append('<select id="institute-optional" name="institute-optional" required><option value="" disabled selected>Select Institute Level Subject</option></select>');
//                 subjects[selectedSem].optional.institute.forEach(subject => {
//                     $('#institute-optional').append(`<option value="${subject.id}">${subject.name}</option>`);
//                 });
//             }
//         }
//     });

//     /// Function to validate if username, college ID, or roll number already exists in the selected semester
//     function validateExistingAttributes(attributeType, attributeValue, callback) {
//         const selectedSem = $('#sem').val();
//         if (!selectedSem) return;

//         // Perform an AJAX request to check if the attribute already exists in the database
//         $.ajax({
//             url: `http://127.0.0.1:5000/check-attribute/${selectedSem}/${attributeType}/${attributeValue}`,
//             type: 'GET',
//             success: function (response) {
//                 callback(response.exists);
//             },
//             error: function () {
//                 console.error(`Error checking ${attributeType} in database.`);
//                 callback(false);
//             }
//         });
//     }

//     // Function to show error message and disable register button
//     function showError(field, message) {
//         const errorElement = $(`#${field}-error`);
//         errorElement.text(message).addClass('active').show(); // Ensure error message is displayed
//         disableRegisterButton();
//     }

//     // Function to hide error message and re-enable register button if valid
//     function hideError(field) {
//         const errorElement = $(`#${field}-error`);
//         errorElement.removeClass('active').hide(); // Hide error message
//         enableRegisterButtonIfValid();
//     }

//     // Handle username change and check if it already exists
//     $('#username').on('input', function () {
//         const username = $(this).val();
//         if (!username) return;

//         validateExistingAttributes('username', username, function (exists) {
//             if (exists) {
//                 showError('username', 'The username already exists. Please choose a different one.');
//             } else {
//                 hideError('username');
//             }
//         });
//     });

//     // Handle roll number change and check if it already exists
//     $('#rollno').on('input', function () {
//         const rollNo = $(this).val();
//         if (!rollNo) return;

//         validateExistingAttributes('rollno', rollNo, function (exists) {
//             if (exists) {
//                 showError('rollno', 'The roll number already exists. Please choose a different one.');
//             } else {
//                 hideError('rollno');
//             }
//         });
//     });

//     // Handle college ID change and check if it already exists
//     $('#collegeid').on('input', function () {
//         const collegeID = $(this).val();
//         if (!collegeID) return;

//         if (!emailRegex.test(collegeID)) {
//             showError('collegeid', 'College ID must end with @kccemsr.edu.in');
//         } else {
//             validateExistingAttributes('collegeid', collegeID, function (exists) {
//                 if (exists) {
//                     showError('collegeid', 'The college ID already exists. Please choose a different one.');
//                 } else {
//                     hideError('collegeid');
//                 }
//             });
//         }
//     });

//     // Validate phone number
//     $('#phoneno').on('input', function () {
//         const phoneNo = $(this).val();
//         const errorElement = $('#phoneno-error');

//         if (!/^\d*$/.test(phoneNo)) {
//             errorElement.text('Phone number can only contain digits.').addClass('active').show();
//             disableRegisterButton();
//         } else if (!phoneRegex.test(phoneNo)) {
//             errorElement.text('Phone number must be exactly 10 digits.').addClass('active').show();
//             disableRegisterButton();
//         } else {
//             errorElement.removeClass('active').hide();
//             enableRegisterButtonIfValid();
//         }
//     });

//     // Validate password matching
//     $('#confirmpassword').on('input', function () {
//         const password = $('#password').val();
//         const confirmPassword = $(this).val();
//         const errorElement = $('#password-error');

//         if (password !== confirmPassword) {
//             errorElement.text('Passwords do not match.').addClass('active').show();
//             disableRegisterButton();
//         } else {
//             errorElement.removeClass('active').hide();
//             enableRegisterButtonIfValid();
//         }
//     });

//     // Check all fields for validation before enabling the register button
//     function enableRegisterButtonIfValid() {
//         const isValidPhone = phoneRegex.test($('#phoneno').val());
//         const isValidEmail = emailRegex.test($('#collegeid').val());
//         const isPasswordMatch = $('#password').val() === $('#confirmpassword').val();
//         const areRequiredFieldsFilled = $('#username').val() && $('#fullname').val() && $('#address').val() && $('#rollno').val() && $('#sem').val();
//         const noError = !$('.error-message.active').length;

//         if (isValidPhone && isValidEmail && isPasswordMatch && areRequiredFieldsFilled && noError) {
//             $('#register-btn').removeAttr('disabled');
//         }
//     }

//     function disableRegisterButton() {
//         $('#register-btn').attr('disabled', true);
//     }

//     // Initially disable the register button if fields are not filled
//     disableRegisterButton();

//     // Handle form submission
//     $('#student-register-form').submit(function (event) {
//         event.preventDefault();

//         const formData = $(this).serializeArray();  // Serialize the form data
//         const selectedSem = $('#sem').val();
//         let selectedSubjects = [];

//         // Collect compulsory subjects
//         subjects[selectedSem].compulsory.forEach(subject => {
//             selectedSubjects.push({ id: subject.id, name: subject.name });
//         });

//         // Collect optional subjects (if any)
//         if (selectedSem === "V" || selectedSem === "VI") {
//             const optionalSubject = $('#department-optional').val();
//             const subject = subjects[selectedSem].optional.find(opt => opt.id === optionalSubject);
//             if (subject) {
//                 selectedSubjects.push({ id: subject.id, name: subject.name });
//             }
//         } else if (selectedSem === "VII" || "VIII") {
//             const departmentOptional1 = $('#department-optional1').val();
//             const departmentOptional2 = $('#department-optional2').val();
//             const instituteOptional = $('#institute-optional').val();

//             const dept1 = subjects[selectedSem].optional.department.find(opt => opt.id === departmentOptional1);
//             const dept2 = subjects[selectedSem].optional.department.find(opt => opt.id === departmentOptional2);
//             const institute = subjects[selectedSem].optional.institute.find(opt => opt.id === instituteOptional);

//             if (dept1) selectedSubjects.push({ id: dept1.id, name: dept1.name });
//             if (dept2) selectedSubjects.push({ id: dept2.id, name: dept2.name });
//             if (institute) selectedSubjects.push({ id: institute.id, name: institute.name });
//         }

//         // Add selected subjects to form data
//         formData.push({ name: 'subjects', value: JSON.stringify(selectedSubjects) });

//         // Send form data via AJAX
//         $.ajax({
//             type: 'POST',
//             url: 'http://127.0.0.1:5000/register-student',
//             data: $.param(formData),  // Serialize formData object
//             success: function (response) {
//                 alert(response.message);
//             },
//             error: function () {
//                 alert("Error in registration");
//             }
//         });
//     });
// });





$(document).ready(function () {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._$]+@kccemsr\.edu\.in$/;

    // Subjects data remains unchanged
    const subjects = {
        "III": {
            compulsory: [
                {"id": "ITC301", "name": "Engineering Mathematics-III"},
                {"id": "ITC302", "name": "Data Structure and Analysis"},
                {"id": "ITC303", "name": "Database Management System"},
                {"id": "ITC304", "name": "Principle of Communication"},
                {"id": "ITC305", "name": "Paradigms and Computer Programming Fundamentals"}
            ],
            optional: []
        },
        "IV": {
            compulsory: [
                {"id": "ITC401", "name": "Engineering Mathematics-IV"},
                {"id": "ITC402", "name": "Computer Network and Network Design"},
                {"id": "ITC403", "name": "Operating System"},
                {"id": "ITC404", "name": "Automata Theory"},
                {"id": "ITC405", "name": "Computer Organization and Architecture"}
            ],
            optional: []
        },
        "V": {
            compulsory: [
                {"id": "ITC501", "name": "Internet Programming"},
                {"id": "ITC502", "name": "Computer Network Security"},
                {"id": "ITC503", "name": "Entrepreneurship and E-business"},
                {"id": "ITC504", "name": "Software Engineering"}
            ],
            optional: [
                {"id": "ITDO5012", "name": "Advance Data Management Technologies"},
                {"id": "ITDO5014", "name": "Advanced Data Structure and Analysis"}
            ]
        },
        "VI": {
            compulsory: [
                {"id": "ITC601", "name": "Data Mining & Business Intelligence"},
                {"id": "ITC602", "name": "Web X.0"},
                {"id": "ITC603", "name": "Wireless Technology"},
                {"id": "ITC604", "name": "AI and DS – 1"}
            ],
            optional: [
                {"id": "ITDO6011", "name": "Software Architecture"},
                {"id": "ITDO6012", "name": "Image Processing"},
                {"id": "ITDO6013", "name": "Green IT"},
                {"id": "ITDO6014", "name": "Ethical Hacking and Forensic"}
            ]
        },
        "VII": {
            compulsory: [
                {"id": "ITC701", "name": "AI and DS – II"},
                {"id": "ITC702", "name": "Internet of Everything"}
            ],
            optional: {
                department: [
                    {"id": "ITDO7011", "name": "Storage Area Network"},
                    {"id": "ITDO7012", "name": "High-Performance Computing"},
                    {"id": "ITDO7013", "name": "Infrastructure Security"},
                    {"id": "ITDO7014", "name": "Software Testing and QA"}
                ],
                institute: [
                    {"id": "ILO7011", "name": "Product Lifecycle Management"},
                    {"id": "ILO7012", "name": "Reliability Engineering"},
                    {"id": "ILO7013", "name": "Management Information System"}
                ]
            }
        },
        "VIII": {
            compulsory: [
                {"id": "ITC801", "name": "Big Data Analytics"},
                {"id": "ITC802", "name": "Internet of Everything"}
            ],
            optional: {
                department: [
                    {"id": "ITDLO8041", "name": "User Interaction Design"},
                    {"id": "ITDLO8042", "name": "Information Retrieval Systems"},
                    {"id": "ITDLO8043", "name": "Knowledge Management"},
                    {"id": "ITDLO8044", "name": "Robotics"}
                ],
                institute: [
                    {"id": "ILO8021", "name": "Project Management"},
                    {"id": "ILO8022", "name": "Finance Management"},
                    {"id": "ILO8023", "name": "Entrepreneurship Development and Management"}
                ]
            }
        }
    };

    // Function to validate if username, college ID, or roll number already exists in the selected semester
    function validateExistingAttributes(attributeType, attributeValue, callback) {
        const selectedSem = $('#sem').val();
        if (!selectedSem) return;

        // Perform an AJAX request to check if the attribute already exists in the database
        $.ajax({
            url: `http://127.0.0.1:5000/check-attribute/${selectedSem}/${attributeType}/${attributeValue}`,
            type: 'GET',
            success: function (response) {
                callback(response.exists);
            },
            error: function () {
                console.error(`Error checking ${attributeType} in database.`);
                callback(false);
            }
        });
    }

    // Handle semester change
    $('#sem').change(function () {
        const selectedSem = $(this).val();
        const compulsoryContainer = $('#compulsory-subjects-container');
        const optionalContainer = $('#optional-subjects-container');
        compulsoryContainer.empty();
        optionalContainer.empty();

        if (selectedSem && subjects[selectedSem]) {
            // Populate compulsory subjects
            compulsoryContainer.append('<h3>Compulsory Subjects:</h3>');
            subjects[selectedSem].compulsory.forEach(subject => {
                compulsoryContainer.append(`<p>${subject.id} - ${subject.name}</p>`);
            });

            // Handle optional subjects for Semester V and VI
            if (selectedSem === "V" || selectedSem === "VI") {
                optionalContainer.append('<h4>Select Department Level Subject:</h4>');
                optionalContainer.append('<select id="department-optional" name="department-optional" required><option value="" disabled selected>Select Department Level Subject</option></select>');
                subjects[selectedSem].optional.forEach(subject => {
                    $('#department-optional').append(`<option value="${subject.id}">${subject.name}</option>`);
                });
            }

            // Handling for Semester VII (two department-level subjects)
            if (selectedSem === "VII") {
                optionalContainer.append('<h4>Select Department Level Subjects:</h4>');
                optionalContainer.append('<select id="department-optional1" name="department-optional1" required><option value="" disabled selected>Select Department Level Subject 1</option></select>');
                optionalContainer.append('<select id="department-optional2" name="department-optional2" required><option value="" disabled selected>Select Department Level Subject 2</option></select>');

                subjects[selectedSem].optional.department.forEach(subject => {
                    $('#department-optional1').append(`<option value="${subject.id}">${subject.name}</option>`);
                    $('#department-optional2').append(`<option value="${subject.id}">${subject.name}</option>`);
                });

                $('#department-optional1').change(function () {
                    const selectedValue = $(this).val();
                    $('#department-optional2 option').prop('disabled', false);
                    $('#department-optional2 option[value="' + selectedValue + '"]').prop('disabled', true);
                });

                $('#department-optional2').change(function () {
                    const selectedValue = $(this).val();
                    $('#department-optional1 option').prop('disabled', false);
                    $('#department-optional1 option[value="' + selectedValue + '"]').prop('disabled', true);
                });

                optionalContainer.append('<h4>Select Institute Level Subject:</h4>');
                optionalContainer.append('<select id="institute-optional" name="institute-optional" required><option value="" disabled selected>Select Institute Level Subject</option></select>');
                subjects[selectedSem].optional.institute.forEach(subject => {
                    $('#institute-optional').append(`<option value="${subject.id}">${subject.name}</option>`);
                });
            }

            // Handling for Semester VIII (one department-level subject)
            if (selectedSem === "VIII") {
                optionalContainer.append('<h4>Select Department Level Subject:</h4>');
                optionalContainer.append('<select id="department-optional" name="department-optional" required><option value="" disabled selected>Select Department Level Subject</option></select>');

                subjects[selectedSem].optional.department.forEach(subject => {
                    $('#department-optional').append(`<option value="${subject.id}">${subject.name}</option>`);
                });

                optionalContainer.append('<h4>Select Institute Level Subject:</h4>');
                optionalContainer.append('<select id="institute-optional" name="institute-optional" required><option value="" disabled selected>Select Institute Level Subject</option></select>');
                subjects[selectedSem].optional.institute.forEach(subject => {
                    $('#institute-optional').append(`<option value="${subject.id}">${subject.name}</option>`);
                });
            }
        }
    });

    // The rest of the existing code remains unchanged for validation and form submission.
    // Function to show error message and disable register button
    function showError(field, message) {
        const errorElement = $(`#${field}-error`);
        errorElement.text(message).addClass('active').show(); // Ensure error message is displayed
        disableRegisterButton();
    }

    // Function to hide error message and re-enable register button if valid
    function hideError(field) {
        const errorElement = $(`#${field}-error`);
        errorElement.removeClass('active').hide(); // Hide error message
        enableRegisterButtonIfValid();
    }

    // Handle username change and check if it already exists
    $('#username').on('input', function () {
        const username = $(this).val();
        if (!username) return;

        validateExistingAttributes('username', username, function (exists) {
            if (exists) {
                showError('username', 'The username already exists. Please choose a different one.');
            } else {
                hideError('username');
            }
        });
    });

    // Handle roll number change and check if it already exists
    $('#rollno').on('input', function () {
        const rollNo = $(this).val();
        if (!rollNo) return;

        validateExistingAttributes('rollno', rollNo, function (exists) {
            if (exists) {
                showError('rollno', 'The roll number already exists. Please choose a different one.');
            } else {
                hideError('rollno');
            }
        });
    });

    // Handle college ID change and check if it already exists
    $('#collegeid').on('input', function () {
        const collegeID = $(this).val();
        if (!collegeID) return;

        if (!emailRegex.test(collegeID)) {
            showError('collegeid', 'College ID must end with @kccemsr.edu.in');
        } else {
            validateExistingAttributes('collegeid', collegeID, function (exists) {
                if (exists) {
                    showError('collegeid', 'The college ID already exists. Please choose a different one.');
                } else {
                    hideError('collegeid');
                }
            });
        }
    });

    // Validate phone number
    $('#phoneno').on('input', function () {
        const phoneNo = $(this).val();
        const errorElement = $('#phoneno-error');

        if (!/^\d*$/.test(phoneNo)) {
            errorElement.text('Phone number can only contain digits.').addClass('active').show();
            disableRegisterButton();
        } else if (!phoneRegex.test(phoneNo)) {
            errorElement.text('Phone number must be exactly 10 digits.').addClass('active').show();
            disableRegisterButton();
        } else {
            errorElement.removeClass('active').hide();
            enableRegisterButtonIfValid();
        }
    });

    // Validate password matching
    $('#confirmpassword').on('input', function () {
        const password = $('#password').val();
        const confirmPassword = $(this).val();
        const errorElement = $('#password-error');

        if (password !== confirmPassword) {
            errorElement.text('Passwords do not match.').addClass('active').show();
            disableRegisterButton();
        } else {
            errorElement.removeClass('active').hide();
            enableRegisterButtonIfValid();
        }
    });

    // Check all fields for validation before enabling the register button
    function enableRegisterButtonIfValid() {
        const isValidPhone = phoneRegex.test($('#phoneno').val());
        const isValidEmail = emailRegex.test($('#collegeid').val());
        const isPasswordMatch = $('#password').val() === $('#confirmpassword').val();
        const areRequiredFieldsFilled = $('#username').val() && $('#fullname').val() && $('#address').val() && $('#rollno').val() && $('#sem').val();
        const noError = !$('.error-message.active').length;

        if (isValidPhone && isValidEmail && isPasswordMatch && areRequiredFieldsFilled && noError) {
            $('#register-btn').removeAttr('disabled');
        }
    }

    function disableRegisterButton() {
        $('#register-btn').attr('disabled', true);
    }

    // Initially disable the register button if fields are not filled
    disableRegisterButton();

    // Handle form submission
    $('#student-register-form').submit(function (event) {
        event.preventDefault();

        const formData = $(this).serializeArray();  // Serialize the form data
        const selectedSem = $('#sem').val();
        let selectedSubjects = [];

        // Collect compulsory subjects
        subjects[selectedSem].compulsory.forEach(subject => {
            selectedSubjects.push({ id: subject.id, name: subject.name });
        });

        // Collect optional subjects (if any)
        if (selectedSem === "V" || selectedSem === "VI") {
            const optionalSubject = $('#department-optional').val();
            const subject = subjects[selectedSem].optional.find(opt => opt.id === optionalSubject);
            if (subject) {
                selectedSubjects.push({ id: subject.id, name: subject.name });
            }
        } else if (selectedSem === "VII") {
            const departmentOptional1 = $('#department-optional1').val();
            const departmentOptional2 = $('#department-optional2').val();
            const instituteOptional = $('#institute-optional').val();

            const dept1 = subjects[selectedSem].optional.department.find(opt => opt.id === departmentOptional1);
            const dept2 = subjects[selectedSem].optional.department.find(opt => opt.id === departmentOptional2);
            const institute = subjects[selectedSem].optional.institute.find(opt => opt.id === instituteOptional);

            if (dept1) selectedSubjects.push({ id: dept1.id, name: dept1.name });
            if (dept2) selectedSubjects.push({ id: dept2.id, name: dept2.name });
            if (institute) selectedSubjects.push({ id: institute.id, name: institute.name });
        } else if (selectedSem === "VIII") {
            const departmentOptional = $('#department-optional').val();
            const instituteOptional = $('#institute-optional').val();

            const dept = subjects[selectedSem].optional.department.find(opt => opt.id === departmentOptional);
            const institute = subjects[selectedSem].optional.institute.find(opt => opt.id === instituteOptional);

            if (dept) selectedSubjects.push({ id: dept.id, name: dept.name });
            if (institute) selectedSubjects.push({ id: institute.id, name: institute.name });
        }

        // Add selected subjects to form data
        formData.push({ name: 'subjects', value: JSON.stringify(selectedSubjects) });

        // Send form data via AJAX
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/register-student',
            data: $.param(formData),  // Serialize formData object
            success: function (response) {
                alert(response.message);
//redirect ti index.html
            window.location.href= 'index.html';
            },
            error: function () {
                alert("Error in registration");
            }
        });
    });
});
