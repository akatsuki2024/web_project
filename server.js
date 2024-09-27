

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Initialize the app
// const app = express();
// const port = 5000;

// // Middleware to parse JSON and enable CORS
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB (IT-Students database for storing student information)
// mongoose.connect('mongodb://127.0.0.1:27017/IT-Students')
//     .then(() => {
//         console.log('Connected to MongoDB IT-Students');
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB IT-Students:', error);
//     });

// // Connect to MongoDB (Teacher-Details database for storing teacher information)
// const teacherConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Teacher-Details');

// teacherConnection.on('connected', () => {
//     console.log('Connected to MongoDB Teacher-Details');
// });

// teacherConnection.on('error', (error) => {
//     console.error('Error connecting to Teacher-Details database:', error);
// });

// // Schema for teacher registration (use the same schema for both registration and fetching subjects)
// const teacherSchema = new mongoose.Schema({
//     username: String,
//     fullname: String,
//     employeeid: String,
//     phoneno: String,
//     address: String,
//     subjects: Object, // Store { "III": { "code": "subject_code", "name": "subject_name" }, ... }
//     password: String
// });

// // Schema for student registration
// const studentSchema = new mongoose.Schema({
//     username: String,
//     fullname: String,
//     collegeid: String,
//     phoneno: String,
//     address: String,
//     rollno: String,
//     semester: String,
//     subjects: Array,
//     password: String
// });

// // Schema for Attendance
// const attendanceSchema = new mongoose.Schema({
//     date: String,
//     subjectCode: String,
//     semester: String,
//     attendance: Array  // Store attendance records as an array of objects
// });

// // Pre-existing collection names for each semester (students)
// const semesterCollections = {
//     "III": "IT-Semester-III",
//     "IV": "IT-Semester-IV",
//     "V": "IT-Semester-V",
//     "VI": "IT-Semester-VI",
//     "VII": "IT-Semester-VII",
//     "VIII": "IT-Semester-VIII"
// };

// // Helper function to get the collection name based on the selected semester (for students)
// function getCollectionForSemester(semester) {
//     return semesterCollections[semester];
// }

// // Student registration endpoint
// app.post('/register-student', async (req, res) => {
//     try {
//         const { username, fullname, collegeid, phoneno, address, rollno, sem, password } = req.body;
//         let selectedSubjects = req.body.subjects || {};  // Default to an empty object if no subjects

//         console.log('Received Student Data:', req.body);

//         // Validate required fields
//         if (!username || !fullname || !collegeid || !phoneno || !address || !rollno || !sem || !password) {
//             console.log('Missing required fields:', req.body);
//             return res.status(400).json({ message: 'All fields are required.' });
//         }

//         // Ensure subjects is in object format
//         if (typeof selectedSubjects === 'string') {
//             selectedSubjects = JSON.parse(selectedSubjects);
//         }

//         // Prepare student data with subjects as an object
//         const studentData = {
//             username,
//             fullname,
//             collegeid,
//             phoneno,
//             address,
//             rollno,
//             semester: sem,
//             subjects: selectedSubjects,  // Now storing as object
//             password
//         };

//         // Get the correct collection name based on the selected semester
//         const collectionName = getCollectionForSemester(sem);

//         // If the semester is invalid, return an error
//         if (!collectionName) {
//             console.error('Invalid semester selected:', sem);
//             return res.status(400).json({ message: 'Invalid semester selected!' });
//         }

//         // Use the pre-existing collection based on the semester
//         const StudentModel = mongoose.model(collectionName, studentSchema, collectionName);

//         // Save the student data in the appropriate collection
//         const newStudent = new StudentModel(studentData);
//         await newStudent.save();

//         console.log(`Student registered successfully in ${collectionName}`);
//         res.status(200).json({ message: `Student registered successfully in ${collectionName}` });
//     } catch (error) {
//         console.error('Error registering student:', error); // Log any errors
//         res.status(500).json({ message: 'Error registering student', error: error.message });
//     }
// });

// // Teacher registration endpoint
// app.post('/register-teacher', async (req, res) => {
//     try {
//         const { username, fullname, employeeid, phoneno, address, password, subjects } = req.body;

//         console.log('Received Teacher Data:', req.body);

//         // Validate required fields
//         if (!username || !fullname || !employeeid || !phoneno || !address || !password || !subjects) {
//             console.log('Missing required fields:', req.body);
//             return res.status(400).json({ message: 'All fields are required.' });
//         }

//         // Prepare teacher data
//         const teacherData = {
//             username,
//             fullname,
//             employeeid,
//             phoneno,
//             address,
//             subjects: JSON.parse(subjects), // This will now handle both code and name for each semester
//             password
//         };

//         // Use the connection to Teacher-Details database
//         const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');

//         // Save the teacher data in the 'teachers' collection in the 'Teacher-Details' database
//         const newTeacher = new TeacherModel(teacherData);
//         await newTeacher.save();

//         console.log('Teacher registered successfully in Teacher-Details database');
//         res.status(200).json({ message: 'Teacher registered successfully in Teacher-Details database' });
//     } catch (error) {
//         console.error('Error registering teacher:', error); // Log any errors
//         res.status(500).json({ message: 'Error registering teacher', error: error.message });
//     }
// });

// // Teacher login endpoint
// app.post('/login-teacher', async (req, res) => {
//     const { identifier, password } = req.body;

//     try {
//         // Search in MongoDB for the teacher with the provided username or employee ID
//         const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
//         const teacher = await TeacherModel.findOne({
//             $or: [{ username: identifier }, { employeeid: identifier }]
//         });

//         if (teacher) {
//             // Check if the password matches
//             if (teacher.password === password) {
//                 res.json({ success: true });
//             } else {
//                 res.json({ success: false });
//             }
//         } else {
//             res.json({ success: false });
//         }
//     } catch (error) {
//         console.error('Error during teacher login:', error);
//         res.status(500).json({ success: false });
//     }
// });

// // Fetch teacher's subjects after login
// app.get('/get-teacher-subjects/:username', async (req, res) => {
//     const username = req.params.username;

//     try {
//         // Use the correct connection and model to fetch teacher's subjects
//         const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
//         const teacher = await TeacherModel.findOne({
//             $or: [
//                 { username: username },
//                 { employeeid: username }  // For employee ID login
//             ]
//         });

//         if (!teacher) {
//             return res.status(404).json({ success: false, message: 'Teacher not found' });
//         }

//         return res.json({ success: true, subjects: teacher.subjects });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// // Route to get students based on the semester and subject
// app.get('/get-students/:semester/:subjectCode', async (req, res) => {
//     const { semester, subjectCode } = req.params;

//     // Validate the inputs to avoid processing invalid or empty parameters
//     if (!semester || !subjectCode) {
//         return res.status(400).json({ success: false, message: 'Semester or Subject Code is missing!' });
//     }

//     try {
//         // Connect to the correct student collection for the given semester
//         const collectionName = getCollectionForSemester(semester);

//         // Check if the collection name is valid
//         if (!collectionName) {
//             return res.status(400).json({ success: false, message: 'Invalid semester provided!' });
//         }

//         const StudentModel = mongoose.model(collectionName, studentSchema, collectionName);

//         // Find students enrolled in the given subject based on `subjectCode`
//         const students = await StudentModel.find({ 'subjects.id': subjectCode });

//         // If no students are found, respond with a meaningful message
//         if (!students || students.length === 0) {
//             return res.status(404).json({ success: false, message: 'No students found for the given subject and semester.' });
//         }

//         // Send the list of students back in the response
//         res.status(200).json({ success: true, students });
//     } catch (error) {
//         console.error('Error fetching students:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch students' });
//     }
// });

// // Route to submit attendance
// app.post('/submit-attendance', async (req, res) => {
//     const { date, subjectCode, semester, attendance } = req.body;

//     // Validate the inputs to avoid processing invalid or empty parameters
//     if (!date || !subjectCode || !semester || !attendance) {
//         return res.status(400).json({ success: false, message: 'Date, Subject Code, Semester, or Attendance data is missing!' });
//     }

//     try {
//         // Dynamically determine the collection name for attendance based on semester and subject code
//         const AttendanceModel = mongoose.model('Attendance', attendanceSchema, `attendance_${semester}_${subjectCode}`);

//         // Create a new attendance record
//         const newAttendance = new AttendanceModel({
//             date,
//             subjectCode,
//             semester,
//             attendance
//         });

//         // Save the attendance record in the respective collection
//         await newAttendance.save();

//         // Send a success response back to the client
//         res.status(200).json({ success: true, message: 'Attendance saved successfully' });
//     } catch (error) {
//         console.error('Error saving attendance:', error);
//         res.status(500).json({ success: false, message: 'Failed to save attendance' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });











//-----------------------------------------------------------------------------







const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
const port = 5000;

// Middleware to parse JSON and enable CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



// Connect to MongoDB (IT-Students database for storing student information)
mongoose.connect('mongodb://127.0.0.1:27017/IT-Students')
    .then(() => {
        console.log('Connected to MongoDB IT-Students');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB IT-Students:', error);
    });

// Connect to MongoDB (Teacher-Details database for storing teacher information)
const teacherConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Teacher-Details');

teacherConnection.on('connected', () => {
    console.log('Connected to MongoDB Teacher-Details');
});

teacherConnection.on('error', (error) => {
    console.error('Error connecting to Teacher-Details database:', error);
});

// Connect to MongoDB (Attendance database for storing attendance information)
const attendanceConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance');

attendanceConnection.on('connected', () => {
    console.log('Connected to MongoDB Attendance');
});

attendanceConnection.on('error', (error) => {
    console.error('Error connecting to Attendance database:', error);
});

// Schema for teacher registration (use the same schema for both registration and fetching subjects)
const teacherSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    employeeid: String,
    phoneno: String,
    address: String,
    subjects: Object, // Store { "III": { "code": "subject_code", "name": "subject_name" }, ... }
    password: String
});

// Schema for student registration
const studentSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    collegeid: String,
    phoneno: String,
    address: String,
    rollno: String,
    semester: String,
    subjects: Array,
    password: String
});

// Schema for Attendance
const attendanceSchema = new mongoose.Schema({
    date: String,
    subjectCode: String,
    semester: String,
    attendance: Array  // Store attendance records as an array of objects
});

// Pre-existing collection names for each semester (students)
const semesterCollections = {
    "III": "IT-Semester-III",
    "IV": "IT-Semester-IV",
    "V": "IT-Semester-V",
    "VI": "IT-Semester-VI",
    "VII": "IT-Semester-VII",
    "VIII": "IT-Semester-VIII"
};

// Helper function to get the collection name based on the selected semester (for students)
function getCollectionForSemester(semester) {
    return semesterCollections[semester];
}

// Student registration endpoint
app.post('/register-student', async (req, res) => {
    try {
        const { username, fullname, collegeid, phoneno, address, rollno, sem, password } = req.body;
        let selectedSubjects = req.body.subjects || {};  // Default to an empty object if no subjects

        console.log('Received Student Data:', req.body);

        // Validate required fields
        if (!username || !fullname || !collegeid || !phoneno || !address || !rollno || !sem || !password) {
            console.log('Missing required fields:', req.body);
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Ensure subjects is in object format
        if (typeof selectedSubjects === 'string') {
            selectedSubjects = JSON.parse(selectedSubjects);
        }

        // Prepare student data with subjects as an object
        const studentData = {
            username,
            fullname,
            collegeid,
            phoneno,
            address,
            rollno,
            semester: sem,
            subjects: selectedSubjects,  // Now storing as object
            password
        };

        // Get the correct collection name based on the selected semester
        const collectionName = getCollectionForSemester(sem);

        // If the semester is invalid, return an error
        if (!collectionName) {
            console.error('Invalid semester selected:', sem);
            return res.status(400).json({ message: 'Invalid semester selected!' });
        }

        // Use the pre-existing collection based on the semester
        const StudentModel = mongoose.model(collectionName, studentSchema, collectionName);

        // Save the student data in the appropriate collection
        const newStudent = new StudentModel(studentData);
        await newStudent.save();

        console.log(`Student registered successfully in ${collectionName}`);
        res.status(200).json({ message: `Student registered successfully in ${collectionName}` });
    } catch (error) {
        console.error('Error registering student:', error); // Log any errors
        res.status(500).json({ message: 'Error registering student', error: error.message });
    }
});

// Teacher registration endpoint
app.post('/register-teacher', async (req, res) => {
    try {
        const { username, fullname, employeeid, phoneno, address, password, subjects } = req.body;

        console.log('Received Teacher Data:', req.body);

        // Validate required fields
        if (!username || !fullname || !employeeid || !phoneno || !address || !password || !subjects) {
            console.log('Missing required fields:', req.body);
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Prepare teacher data
        const teacherData = {
            username,
            fullname,
            employeeid,
            phoneno,
            address,
            subjects: JSON.parse(subjects), // This will now handle both code and name for each semester
            password
        };

        // Use the connection to Teacher-Details database
        const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');

        // Save the teacher data in the 'teachers' collection in the 'Teacher-Details' database
        const newTeacher = new TeacherModel(teacherData);
        await newTeacher.save();

        console.log('Teacher registered successfully in Teacher-Details database');
        res.status(200).json({ message: 'Teacher registered successfully in Teacher-Details database' });
    } catch (error) {
        console.error('Error registering teacher:', error); // Log any errors
        res.status(500).json({ message: 'Error registering teacher', error: error.message });
    }
});

// Teacher login endpoint
app.post('/login-teacher', async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Search in MongoDB for the teacher with the provided username or employee ID
        const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
        const teacher = await TeacherModel.findOne({
            $or: [{ username: identifier }, { employeeid: identifier }]
        });

        if (teacher) {
            // Check if the password matches
            if (teacher.password === password) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error during teacher login:', error);
        res.status(500).json({ success: false });
    }
});

// Fetch teacher's subjects after login
app.get('/get-teacher-subjects/:username', async (req, res) => {
    const username = req.params.username;

    try {
        // Use the correct connection and model to fetch teacher's subjects
        const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
        const teacher = await TeacherModel.findOne({
            $or: [
                { username: username },
                { employeeid: username }  // For employee ID login
            ]
        });

        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }

        return res.json({ success: true, subjects: teacher.subjects });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Route to get students based on the semester and subject
app.get('/get-students/:semester/:subjectCode', async (req, res) => {
    const { semester, subjectCode } = req.params;
    try {
        // Connect to the correct student collection for the given semester
        const collectionName = getCollectionForSemester(semester);
        const StudentModel = mongoose.model(collectionName, studentSchema, collectionName);

        // Find students enrolled in the given subject
        const students = await StudentModel.find({ 'subjects.id': subjectCode });
        res.status(200).json({ success: true, students });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch students' });
    }
});

// Route to submit attendance to the attendance database
app.post('/submit-attendance', async (req, res) => {
    const { date, subjectCode, semester, attendance } = req.body;
    try {
        // Use the attendanceConnection to store the data in the attendance database
        const AttendanceModel = attendanceConnection.model('Attendance', attendanceSchema, `attendance_${semester}_${subjectCode}`);

        const newAttendance = new AttendanceModel({
            date,
            subjectCode,
            semester,
            attendance
        });

        await newAttendance.save();
        res.status(200).json({ success: true, message: 'Attendance saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to save attendance' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});







//-----------------------------------------------------------------------------------------
