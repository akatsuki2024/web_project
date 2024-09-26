


$(document).ready(function () {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._$]+@kccemsr\.edu\.in$/;

    const subjects = {
        "III": {
            compulsory: [
                {"id": "ITC301", "name": "Engineering Mathematics-III"},
                {"id": "ITC302", "name": "Data Structure and Analysis"},
                {"id": "ITC303", "name": "Database Management System"},
                {"id": "ITC304", "name": "Principle of Communication"},
                {"id": "ITC305", "name": "Paradigms and Computer Programming Fundamentals"},
                {"id": "ITL301", "name": "Data Structure Lab"},
                {"id": "ITL302", "name": "SQL Lab"},
                {"id": "ITL303", "name": "Computer Programming Paradigms Lab"}
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

            // Handle optional subjects for semesters V and VI
            if (selectedSem === "V" || selectedSem === "VI") {
                optionalContainer.append('<h4>Select Department Level Subject:</h4>');
                optionalContainer.append('<select id="department-optional" name="department-optional" required><option value="" disabled selected>Select Department Level Subject</option></select>');
                subjects[selectedSem].optional.forEach(subject => {
                    $('#department-optional').append(`<option value="${subject.id}">${subject.name}</option>`);
                });
            }

                                        // Special handling for semester VII
                        if (selectedSem === "VII") {
                            optionalContainer.append('<h4>Select Department Level Subjects for Semester VII:</h4>');
                            optionalContainer.append('<select id="department-optional1" name="department-optional1" required><option value="" disabled selected>Select Department Level Subject 1</option></select>');
                            optionalContainer.append('<select id="department-optional2" name="department-optional2" required><option value="" disabled selected>Select Department Level Subject 2</option></select>');

                            // Append department level subjects for Semester VII
                            subjects['VII'].optional.department.forEach(subject => {
                                $('#department-optional1').append(`<option value="${subject.id}">${subject.name}</option>`);
                                $('#department-optional2').append(`<option value="${subject.id}">${subject.name}</option>`);
                            });

                            optionalContainer.append('<h4>Select Institute Level Subject for Semester VII:</h4>');
                            optionalContainer.append('<select id="institute-optional" name="institute-optional" required><option value="" disabled selected>Select Institute Level Subject</option></select>');

                            // Append institute level subjects for Semester VII
                            subjects['VII'].optional.institute.forEach(subject => {
                                $('#institute-optional').append(`<option value="${subject.id}">${subject.name}</option>`);
                            });

                            // Add event listener for "department-optional1" to filter "department-optional2"
                            $('#department-optional1').on('change', function() {
                                const selectedSubject1 = $(this).val();

                                // Reset the options for department-optional2
                                $('#department-optional2').empty();
                                $('#department-optional2').append('<option value="" disabled selected>Select Department Level Subject 2</option>');

                                // Append subjects to "department-optional2", excluding the one selected in "department-optional1"
                                subjects['VII'].optional.department.forEach(subject => {
                                    if (subject.id !== selectedSubject1) {
                                        $('#department-optional2').append(`<option value="${subject.id}">${subject.name}</option>`);
                                    }
                                });
                            });
                        }


                                // Special handling for semester VIII
                    if (selectedSem === "VIII") {
                        optionalContainer.append('<h4>Select Department Level Subject for Semester VIII:</h4>');
                        optionalContainer.append('<select id="department-optional1" name="department-optional1" required><option value="" disabled selected>Select Department Level Subject</option></select>');

                        // Append department level subjects for Semester VIII (only one dropdown)
                        subjects['VIII'].optional.department.forEach(subject => {
                            $('#department-optional1').append(`<option value="${subject.id}">${subject.name}</option>`);
                        });

                        optionalContainer.append('<h4>Select Institute Level Subject for Semester VIII:</h4>');
                        optionalContainer.append('<select id="institute-optional" name="institute-optional" required><option value="" disabled selected>Select Institute Level Subject</option></select>');

                        // Append institute level subjects for Semester VIII
                        subjects['VIII'].optional.institute.forEach(subject => {
                            $('#institute-optional').append(`<option value="${subject.id}">${subject.name}</option>`);
                        });
                    }


        }
    });

    // Validate phone number
    $('#phoneno').on('input', function () {
        const phoneNo = $(this).val();
        const errorElement = $('#phoneno-error');

        if (!/^\d*$/.test(phoneNo)) {
            errorElement.text('Phone number can only contain digits.').addClass('active');
            disableRegisterButton();
        } else if (!phoneRegex.test(phoneNo)) {
            errorElement.text('Phone number must be exactly 10 digits.').addClass('active');
            disableRegisterButton();
        } else {
            errorElement.removeClass('active');
            enableRegisterButtonIfValid();
        }
    });

    // Validate college ID
    $('#collegeid').on('input', function () {
        const collegeID = $(this).val();
        const errorElement = $('#collegeid-error');

        if (!emailRegex.test(collegeID)) {
            errorElement.text('College ID must end with @kccemsr.edu.in').addClass('active');
            disableRegisterButton();
        } else {
            errorElement.removeClass('active');
            enableRegisterButtonIfValid();
        }
    });

    // Validate password matching
    $('#confirmpassword').on('input', function () {
        const password = $('#password').val();
        const confirmPassword = $(this).val();
        const errorElement = $('#password-error');

        if (password !== confirmPassword) {
            errorElement.text('Passwords do not match.').addClass('active');
            disableRegisterButton();
        } else {
            errorElement.removeClass('active');
            enableRegisterButtonIfValid();
        }
    });

    // Check all fields for validation before enabling the register button
    function enableRegisterButtonIfValid() {
        const isValidPhone = phoneRegex.test($('#phoneno').val());
        const isValidEmail = emailRegex.test($('#collegeid').val());
        const isPasswordMatch = $('#password').val() === $('#confirmpassword').val();
        const areRequiredFieldsFilled = $('#username').val() && $('#fullname').val() && $('#address').val() && $('#rollno').val() && $('#sem').val();

        if (isValidPhone && isValidEmail && isPasswordMatch && areRequiredFieldsFilled) {
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
        
        const formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/register-student',
            data: formData,
            success: function (response) {
                alert(response.message);
            },
            error: function () {
                alert("Error in registration");
            }
        });
    });
});
