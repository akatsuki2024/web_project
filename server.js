

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

// // // Schema for teacher registration

// const teacherSchema = new mongoose.Schema({
//     username: String,
//     fullname: String,
//     employeeid: String,
//     phoneno: String,
//     address: String,
//     subjects: Object, // Store { "III": { "code": "subject_code", "name": "subject_name" }, ... }
//     password: String
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
//         const selectedSubjects = req.body.subjects || [];  // Default empty array if no subjects are selected

//         console.log('Received Student Data:', req.body);

//         // Validate required fields
//         if (!username || !fullname || !collegeid || !phoneno || !address || !rollno || !sem || !password) {
//             console.log('Missing required fields:', req.body);
//             return res.status(400).json({ message: 'All fields are required.' });
//         }

//         // Prepare student data
//         const studentData = {
//             username,
//             fullname,
//             collegeid,
//             phoneno,
//             address,
//             rollno,
//             semester: sem,
//             subjects: selectedSubjects,
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
//         const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);

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


// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });












// working code 2
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const Teacher = require('./models/Teacher'); // Ensure this path is correct

// // Initialize the app
// const app = express();
// const port = 5000;

// // Middleware to parse JSON and enable CORS
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB (IT-Students database for storing student information)
// const studentConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/IT-Students');

// studentConnection.on('connected', () => {
//     console.log('Connected to MongoDB IT-Students');
// });

// studentConnection.on('error', (error) => {
//     console.error('Error connecting to IT-Students database:', error);
// });

// // Connect to MongoDB (Teacher-Details database for storing teacher information)
// const teacherConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Teacher-Details');

// teacherConnection.on('connected', () => {
//     console.log('Connected to MongoDB Teacher-Details');
// });

// teacherConnection.on('error', (error) => {
//     console.error('Error connecting to Teacher-Details database:', error);
// });

// // Schema for teacher registration
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
//         const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);

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

// // Teacher registration endpoint (unchanged)

// // Student login endpoint
// app.post('/login-student', async (req, res) => {
//     const { username, password } = req.body; // Removed semester from request body

//     try {
//         // Find the student in all semester collections (assuming each semester is stored in its own collection)
//         const semesterCollections = ['IT-Semester-III', 'IT-Semester-IV', 'IT-Semester-V', 'IT-Semester-VI', 'IT-Semester-VII', 'IT-Semester-VIII'];
//         let foundStudent = null;

//         // Loop through the collections to find the student
//         for (const collectionName of semesterCollections) {
//             const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);
//             foundStudent = await StudentModel.findOne({ username: username });

//             if (foundStudent) {
//                 break; // Exit the loop if the student is found
//             }
//         }

//         if (foundStudent) {
//             // Check if the password matches (assuming passwords are stored as plain text; otherwise, hash comparison is needed)
//             if (foundStudent.password === password) {
//                 res.json({ success: true });
//             } else {
//                 res.json({ success: false, message: 'Incorrect password' });
//             }
//         } else {
//             res.json({ success: false, message: 'Student not found' });
//         }
//     } catch (error) {
//         console.error('Error during student login:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// // Teacher login endpoint (unchanged)

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });





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
// const studentConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/IT-Students');

// studentConnection.on('connected', () => {
//     console.log('Connected to MongoDB IT-Students');
// });

// studentConnection.on('error', (error) => {
//     console.error('Error connecting to IT-Students database:', error);
// });

// // Connect to MongoDB (Teacher-Details database for storing teacher information)
// const teacherConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Teacher-Details');

// teacherConnection.on('connected', () => {
//     console.log('Connected to MongoDB Teacher-Details');
// });

// teacherConnection.on('error', (error) => {
//     console.error('Error connecting to Teacher-Details database:', error);
// });

// // Connect to MongoDB (Attendance database for storing attendance information)
// const attendanceConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance');

// attendanceConnection.on('connected', () => {
//     console.log('Connected to MongoDB Attendance');
// });

// attendanceConnection.on('error', (error) => {
//     console.error('Error connecting to Attendance database:', error);
// });

// // Connect to MongoDB (Marks database for storing marks information)
// const marksConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Marks');

// marksConnection.on('connected', () => {
//     console.log('Connected to MongoDB Marks');
// });

// marksConnection.on('error', (error) => {
//     console.error('Error connecting to Marks database:', error);
// });

// // Schemas for Students, Teachers, Attendance, and Marks
// const teacherSchema = new mongoose.Schema({
//     username: String,
//     fullname: String,
//     employeeid: String,
//     phoneno: String,
//     address: String,
//     subjects: Object, // Store { "III": { "code": "subject_code", "name": "subject_name" }, ... }
//     password: String
// });

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

// const attendanceSchema = new mongoose.Schema({
//     date: String,
//     subjectCode: String,
//     semester: String,
//     attendance: Array  // Store attendance records as an array of objects
// });

// const marksSchema = new mongoose.Schema({
//     rollno: String,
//     studentName: String,
//     collegeID: String,
//     ia1: Number,
//     ia2: Number,
//     semester: String,
//     subjectCode: String
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

//         // Validate required fields
//         if (!username || !fullname || !collegeid || !phoneno || !address || !rollno || !sem || !password) {
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
//             subjects: selectedSubjects,
//             password
//         };

//         // Get the correct collection name based on the selected semester
//         const collectionName = getCollectionForSemester(sem);

//         if (!collectionName) {
//             return res.status(400).json({ message: 'Invalid semester selected!' });
//         }

//         // Use the pre-existing collection based on the semester
//         const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);

//         const newStudent = new StudentModel(studentData);
//         await newStudent.save();

//         res.status(200).json({ message: `Student registered successfully in ${collectionName}` });
//     } catch (error) {
//         res.status(500).json({ message: 'Error registering student', error: error.message });
//     }
// });

// // Teacher registration endpoint
// app.post('/register-teacher', async (req, res) => {
//     try {
//         const { username, fullname, employeeid, phoneno, address, subjects, password } = req.body;

//         const teacherData = {
//             username,
//             fullname,
//             employeeid,
//             phoneno,
//             address,
//             subjects: JSON.parse(subjects), // Handle both code and name for each semester
//             password
//         };

//         const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');

//         const newTeacher = new TeacherModel(teacherData);
//         await newTeacher.save();

//         res.status(200).json({ message: 'Teacher registered successfully in Teacher-Details database' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error registering teacher', error: error.message });
//     }
// });

// // Student login endpoint
// app.post('/login-student', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const semesterCollections = ['IT-Semester-III', 'IT-Semester-IV', 'IT-Semester-V', 'IT-Semester-VI', 'IT-Semester-VII', 'IT-Semester-VIII'];
//         let foundStudent = null;

//         for (const collectionName of semesterCollections) {
//             const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);
//             foundStudent = await StudentModel.findOne({ username });

//             if (foundStudent) {
//                 break;
//             }
//         }

//         if (foundStudent && foundStudent.password === password) {
//             res.json({ success: true, student: foundStudent });
//         } else {
//             res.json({ success: false, message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// // Teacher login endpoint
// app.post('/login-teacher', async (req, res) => {
//     const { identifier, password } = req.body;

//     try {
//         const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
//         const teacher = await TeacherModel.findOne({
//             $or: [{ username: identifier }, { employeeid: identifier }]
//         });

//         if (teacher && teacher.password === password) {
//             res.json({ success: true });
//         } else {
//             res.json({ success: false, message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });








// working code 2
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
// const studentConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/IT-Students');

// studentConnection.on('connected', () => {
//     console.log('Connected to MongoDB IT-Students');
// });

// studentConnection.on('error', (error) => {
//     console.error('Error connecting to IT-Students database:', error);
// });

// // Connect to MongoDB (Teacher-Details database for storing teacher information)
// const teacherConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Teacher-Details');

// teacherConnection.on('connected', () => {
//     console.log('Connected to MongoDB Teacher-Details');
// });

// teacherConnection.on('error', (error) => {
//     console.error('Error connecting to Teacher-Details database:', error);
// });

// // Connect to MongoDB (Attendance database for storing attendance information)
// const attendanceConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance');

// attendanceConnection.on('connected', () => {
//     console.log('Connected to MongoDB Attendance');
// });

// attendanceConnection.on('error', (error) => {
//     console.error('Error connecting to Attendance database:', error);
// });

// // Connect to MongoDB (Marks database for storing marks information)
// const marksConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Marks');

// marksConnection.on('connected', () => {
//     console.log('Connected to MongoDB Marks');
// });

// marksConnection.on('error', (error) => {
//     console.error('Error connecting to Marks database:', error);
// });

// // Schemas for Students, Teachers, Attendance, and Marks
// const teacherSchema = new mongoose.Schema({
//     username: String,
//     fullname: String,
//     employeeid: String,
//     phoneno: String,
//     address: String,
//     subjects: Object, // Store { "III": { "code": "subject_code", "name": "subject_name" }, ... }
//     password: String
// });

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

// const attendanceSchema = new mongoose.Schema({
//     date: String,
//     subjectCode: String,
//     semester: String,
//     attendance: Array  // Store attendance records as an array of objects
// });

// const marksSchema = new mongoose.Schema({
//     rollno: String,
//     studentName: String,
//     collegeID: String,
//     ia1: Number,
//     ia2: Number,
//     semester: String,
//     subjectCode: String
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

//         // Validate required fields
//         if (!username || !fullname || !collegeid || !phoneno || !address || !rollno || !sem || !password) {
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
//             subjects: selectedSubjects,
//             password
//         };

//         // Get the correct collection name based on the selected semester
//         const collectionName = getCollectionForSemester(sem);

//         if (!collectionName) {
//             return res.status(400).json({ message: 'Invalid semester selected!' });
//         }

//         // Use the pre-existing collection based on the semester
//         const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);

//         const newStudent = new StudentModel(studentData);
//         await newStudent.save();

//         res.status(200).json({ message: `Student registered successfully in ${collectionName}` });
//     } catch (error) {
//         res.status(500).json({ message: 'Error registering student', error: error.message });
//     }
// });

// // Teacher registration endpoint
// app.post('/register-teacher', async (req, res) => {
//     try {
//         const { username, fullname, employeeid, phoneno, address, subjects, password } = req.body;

//         const teacherData = {
//             username,
//             fullname,
//             employeeid,
//             phoneno,
//             address,
//             subjects: JSON.parse(subjects), // Handle both code and name for each semester
//             password
//         };

//         const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');

//         const newTeacher = new TeacherModel(teacherData);
//         await newTeacher.save();

//         res.status(200).json({ message: 'Teacher registered successfully in Teacher-Details database' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error registering teacher', error: error.message });
//     }
// });

// // Student login endpoint
// app.post('/login-student', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const semesterCollections = ['IT-Semester-III', 'IT-Semester-IV', 'IT-Semester-V', 'IT-Semester-VI', 'IT-Semester-VII', 'IT-Semester-VIII'];
//         let foundStudent = null;

//         for (const collectionName of semesterCollections) {
//             const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);
//             foundStudent = await StudentModel.findOne({ username });

//             if (foundStudent) {
//                 break;
//             }
//         }

//         if (foundStudent && foundStudent.password === password) {
//             res.json({ success: true, student: foundStudent });
//         } else {
//             res.json({ success: false, message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// // Teacher login endpoint
// app.post('/login-teacher', async (req, res) => {
//     const { identifier, password } = req.body;

//     try {
//         const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
//         const teacher = await TeacherModel.findOne({
//             $or: [{ username: identifier }, { employeeid: identifier }]
//         });

//         if (teacher && teacher.password === password) {
//             res.json({ success: true });
//         } else {
//             res.json({ success: false, message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// // Fetch student information based on username
// app.get('/student-info/:username', async (req, res) => {
//     const username = req.params.username;

//     try {
//         const semesterCollections = ['IT-Semester-III', 'IT-Semester-IV', 'IT-Semester-V', 'IT-Semester-VI', 'IT-Semester-VII', 'IT-Semester-VIII'];
//         let foundStudent = null;

//         for (const collectionName of semesterCollections) {
//             const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);
//             foundStudent = await StudentModel.findOne({ username });

//             if (foundStudent) {
//                 break;
//             }
//         }

//         if (foundStudent) {
//             res.json(foundStudent);
//         } else {
//             res.status(404).json({ message: 'Student not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Get students based on the semester and subject
// app.get('/get-students/:semester/:subjectCode', async (req, res) => {
//     const { semester, subjectCode } = req.params;
//     try {
//         const collectionName = getCollectionForSemester(semester);
//         const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);

//         const students = await StudentModel.find({ 'subjects.id': subjectCode });
//         res.status(200).json({ success: true, students });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to fetch students' });
//     }
// });

// // Fetch marks for a subject and semester
// app.get('/get-marks/:semester/:subjectCode', async (req, res) => {
//     const { semester, subjectCode } = req.params;

//     try {
//         const MarksModel = marksConnection.model('Marks', marksSchema, 'marks');
//         const marks = await MarksModel.find({ semester, subjectCode });
//         res.json({ success: true, marks });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Mark attendance
// app.post('/mark-attendance', async (req, res) => {
//     const { date, subjectCode, semester, attendance } = req.body;

//     try {
//         const AttendanceModel = attendanceConnection.model('Attendance', attendanceSchema, 'attendance');
//         const attendanceRecord = new AttendanceModel({ date, subjectCode, semester, attendance });
//         await attendanceRecord.save();
//         res.json({ success: true, message: 'Attendance marked successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error marking attendance', error: error.message });
//     }
// });

// // Endpoint to get teacher's subjects
// app.get('/get-teacher-subjects/:identifier', async (req, res) => {
//     const identifier = req.params.identifier;

//     try {
//         const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
//         const teacher = await TeacherModel.findOne({
//             $or: [{ username: identifier }, { employeeid: identifier }]
//         });

//         if (teacher) {
//             res.json({ success: true, subjects: teacher.subjects });
//         } else {
//             res.status(404).json({ success: false, message: 'Teacher not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });















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
const studentConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/IT-Students');

studentConnection.on('connected', () => {
    console.log('Connected to MongoDB IT-Students');
});

studentConnection.on('error', (error) => {
    console.error('Error connecting to IT-Students database:', error);
});

// Connect to MongoDB (Teacher-Details database for storing teacher information)
const teacherConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Teacher-Details');

teacherConnection.on('connected', () => {
    console.log('Connected to MongoDB Teacher-Details');
});

teacherConnection.on('error', (error) => {
    console.error('Error connecting to Teacher-Details database:', error);
});

// Schema for teacher registration
const teacherSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    employeeid: String,
    phoneno: String,
    address: String,
    subjects: Object, // Store { "III": { "code": "subject_code", "name": "subject_name" }, ... }
    password: String
});

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

        // Validate required fields
        if (!username || !fullname || !collegeid || !phoneno || !address || !rollno || !sem || !password) {
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
            subjects: selectedSubjects,
            password
        };

        // Get the correct collection name based on the selected semester
        const collectionName = getCollectionForSemester(sem);

        if (!collectionName) {
            return res.status(400).json({ message: 'Invalid semester selected!' });
        }

        // Use the pre-existing collection based on the semester
        const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);

        const newStudent = new StudentModel(studentData);
        await newStudent.save();

        res.status(200).json({ message: `Student registered successfully in ${collectionName}` });
    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error: error.message });
    }
});

// Teacher registration endpoint (unchanged)

// Student login endpoint
app.post('/login-student', async (req, res) => {
    const { username, password } = req.body; // Removed semester from request body

    try {
        // Find the student in all semester collections (assuming each semester is stored in its own collection)
        const semesterCollections = ['IT-Semester-III', 'IT-Semester-IV', 'IT-Semester-V', 'IT-Semester-VI', 'IT-Semester-VII', 'IT-Semester-VIII'];
        let foundStudent = null;

        // Loop through the collections to find the student
        for (const collectionName of semesterCollections) {
            const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);
            foundStudent = await StudentModel.findOne({ username: username });

            if (foundStudent) {
                break; // Exit the loop if the student is found
            }
        }

        if (foundStudent) {
            // Check if the password matches (assuming passwords are stored as plain text; otherwise, hash comparison is needed)
            if (foundStudent.password === password) {
                res.json({ success: true });
            } else {
                res.json({ success: false, message: 'Incorrect password' });
            }
        } else {
            res.json({ success: false, message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Fetch student information based on username
app.get('/student-info/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const semesterCollections = ['IT-Semester-III', 'IT-Semester-IV', 'IT-Semester-V', 'IT-Semester-VI', 'IT-Semester-VII', 'IT-Semester-VIII'];
        let foundStudent = null;

        // Check each collection
        for (const collectionName of semesterCollections) {
            const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);
            foundStudent = await StudentModel.findOne({ username });

            if (foundStudent) {
                break;
            }
        }

        if (foundStudent) {
            res.json(foundStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

