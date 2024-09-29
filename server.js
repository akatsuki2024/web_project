






//-----------------------------------------------------------------------------







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

// // Connect to MongoDB (Attendance database for storing attendance information)
// const attendanceConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance');

// attendanceConnection.on('connected', () => {
//     console.log('Connected to MongoDB Attendance');
// });

// attendanceConnection.on('error', (error) => {
//     console.error('Error connecting to Attendance database:', error);
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
//     try {
//         // Connect to the correct student collection for the given semester
//         const collectionName = getCollectionForSemester(semester);
//         const StudentModel = mongoose.model(collectionName, studentSchema, collectionName);

//         // Find students enrolled in the given subject
//         const students = await StudentModel.find({ 'subjects.id': subjectCode });
//         res.status(200).json({ success: true, students });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to fetch students' });
//     }
// });

// // Route to submit attendance to the attendance database
// app.post('/submit-attendance', async (req, res) => {
//     const { date, subjectCode, semester, attendance } = req.body;
//     try {
//         // Use the attendanceConnection to store the data in the attendance database
//         const AttendanceModel = attendanceConnection.model('Attendance', attendanceSchema, `attendance_${semester}_${subjectCode}`);

//         const newAttendance = new AttendanceModel({
//             date,
//             subjectCode,
//             semester,
//             attendance
//         });

//         await newAttendance.save();
//         res.status(200).json({ success: true, message: 'Attendance saved successfully' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to save attendance' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });







//-----------------------------------------------------------------------------------------

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

// // Schema for Marks
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
//         const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
//         const teacher = await TeacherModel.findOne({
//             $or: [{ username: identifier }, { employeeid: identifier }]
//         });

//         if (teacher) {
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
//     try {
//         const collectionName = getCollectionForSemester(semester);
//         const StudentModel = mongoose.model(collectionName, studentSchema, collectionName);

//         const students = await StudentModel.find({ 'subjects.id': subjectCode });
//         res.status(200).json({ success: true, students });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to fetch students' });
//     }
// });

// // Route to submit attendance to the attendance database
// app.post('/submit-attendance', async (req, res) => {
//     const { date, subjectCode, semester, attendance } = req.body;
//     try {
//         const AttendanceModel = attendanceConnection.model('Attendance', attendanceSchema, `attendance_${semester}_${subjectCode}`);

//         const newAttendance = new AttendanceModel({
//             date,
//             subjectCode,
//             semester,
//             attendance
//         });

//         await newAttendance.save();
//         res.status(200).json({ success: true, message: 'Attendance saved successfully' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to save attendance' });
//     }
// });

// // Route to get existing marks data for a subject and semester
// // app.get('/get-marks/:semester/:subjectCode', async (req, res) => {
// //     const { semester, subjectCode } = req.params;

// //     try {
// //         // Use the marksConnection to connect to the appropriate collection
// //         const collectionName = `marks_${semester.toLowerCase()}_${subjectCode.toLowerCase()}`;
// //         const MarksModel = marksConnection.model('Marks', marksSchema, collectionName);

// //         // Fetch all marks for the given semester and subject code
// //         const marks = await MarksModel.find({});
        
// //         res.status(200).json({ success: true, marks });
// //     } catch (error) {
// //         console.error('Failed to fetch marks:', error);
// //         res.status(500).json({ success: false, message: 'Failed to fetch marks', error: error.message });
// //     }
// // });

// // Route to submit marks to the Marks database
// app.post('/submit-marks', async (req, res) => {
//     const { subjectCode, semester, marks } = req.body;

//     // Log the received data for debugging
//     console.log("Received marks submission:", req.body);

//     try {
//         // Check if required fields are provided
//         if (!subjectCode || !semester || !Array.isArray(marks)) {
//             console.error("Invalid data structure received for marks submission");
//             return res.status(400).json({ success: false, message: 'Invalid data structure' });
//         }

//         // Use the marksConnection to store the data in the Marks database
//         const collectionName = `marks_${semester.toLowerCase()}_${subjectCode.toLowerCase()}`;
//         const MarksModel = marksConnection.model('Marks', marksSchema, collectionName);

//         // Log each mark for additional verification
//         marks.forEach(mark => console.log(`Mark entry: ${JSON.stringify(mark)}`));

//         // Save the marks data with upsert (update if exists, insert if not)
//         const updatePromises = marks.map(mark => {
//             const query = { rollno: mark.rollno };
//             const update = {
//                 studentName: mark.studentName,
//                 collegeID: mark.collegeID,
//                 ia1: mark.ia1 !== undefined ? mark.ia1 : null,
//                 ia2: mark.ia2 !== undefined ? mark.ia2 : null,
//                 semester: semester,
//                 subjectCode: subjectCode
//             };
//             return MarksModel.updateOne(query, update, { upsert: true });
//         });

//         // Execute all update operations
//         await Promise.all(updatePromises);

//         res.status(200).json({ success: true, message: 'Marks saved successfully' });
//     } catch (error) {
//         console.error("Error saving marks:", error); // Log the error for debugging
//         res.status(500).json({ success: false, message: 'Failed to save marks', error: error.message });
//     }
// });



// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });





// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const Teacher = require('./models/Teacher');  // Make sure this path is correct


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

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });





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



// om code changes till teacher info
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

// Connect to MongoDB (Attendance database for storing attendance information)
const attendanceConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance');

attendanceConnection.on('connected', () => {
    console.log('Connected to MongoDB Attendance');
});

attendanceConnection.on('error', (error) => {
    console.error('Error connecting to Attendance database:', error);
});

// Connect to MongoDB (Marks database for storing marks information)
const marksConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Marks');

marksConnection.on('connected', () => {
    console.log('Connected to MongoDB Marks');
});

marksConnection.on('error', (error) => {
    console.error('Error connecting to Marks database:', error);
});

// Schemas for Students, Teachers, Attendance, and Marks
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

const attendanceSchema = new mongoose.Schema({
    date: String,
    subjectCode: String,
    semester: String,
    attendance: Array  // Store attendance records as an array of objects
});

const marksSchema = new mongoose.Schema({
    rollno: String,
    studentName: String,
    collegeID: String,
    ia1: Number,
    ia2: Number,
    semester: String,
    subjectCode: String
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

// Teacher registration endpoint
app.post('/register-teacher', async (req, res) => {
    try {
        const { username, fullname, employeeid, phoneno, address, subjects, password } = req.body;

        const teacherData = {
            username,
            fullname,
            employeeid,
            phoneno,
            address,
            subjects: JSON.parse(subjects), // Handle both code and name for each semester
            password
        };

        const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');

        const newTeacher = new TeacherModel(teacherData);
        await newTeacher.save();

        res.status(200).json({ message: 'Teacher registered successfully in Teacher-Details database' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering teacher', error: error.message });
    }
});

// Student login endpoint
app.post('/login-student', async (req, res) => {
    const { username, password } = req.body;

    try {
        const semesterCollections = ['IT-Semester-III', 'IT-Semester-IV', 'IT-Semester-V', 'IT-Semester-VI', 'IT-Semester-VII', 'IT-Semester-VIII'];
        let foundStudent = null;

        for (const collectionName of semesterCollections) {
            const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);
            foundStudent = await StudentModel.findOne({ username });

            if (foundStudent) {
                break;
            }
        }

        if (foundStudent && foundStudent.password === password) {
            res.json({ success: true, student: foundStudent });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Teacher login endpoint
app.post('/login-teacher', async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
        const teacher = await TeacherModel.findOne({
            $or: [{ username: identifier }, { employeeid: identifier }]
        });

        if (teacher && teacher.password === password) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
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

// Get students based on the semester and subject
app.get('/get-students/:semester/:subjectCode', async (req, res) => {
    const { semester, subjectCode } = req.params;
    try {
        const collectionName = getCollectionForSemester(semester);
        const StudentModel = studentConnection.model(collectionName, studentSchema, collectionName);

        const students = await StudentModel.find({ 'subjects.id': subjectCode });
        res.status(200).json({ success: true, students });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch students' });
    }
});

// Fetch marks for a subject and semester
app.get('/get-marks/:semester/:subjectCode', async (req, res) => {
    const { semester, subjectCode } = req.params;

    try {
        const MarksModel = marksConnection.model('Marks', marksSchema, 'marks');
        const marks = await MarksModel.find({ semester, subjectCode });

        res.status(200).json({ success: true, marks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch marks' });
    }
});

// Endpoint to get teacher's subjects
app.get('/get-teacher-subjects/:identifier', async (req, res) => {
    const identifier = req.params.identifier;

    try {
        const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
        const teacher = await TeacherModel.findOne({
            $or: [{ username: identifier }, { employeeid: identifier }]
        });

        if (teacher) {
            res.json({ success: true, subjects: teacher.subjects });
        } else {
            res.status(404).json({ success: false, message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Submit attendance endpoint
app.post('/submit-attendance', async (req, res) => {
    const { date, subjectCode, semester, attendance } = req.body; // attendance is an array of objects with student roll number and attendance status

    try {
        const AttendanceModel = attendanceConnection.model('Attendance', attendanceSchema, 'attendance');

        const newAttendance = new AttendanceModel({
            date,
            subjectCode,
            semester,
            attendance
        });

        await newAttendance.save();
        res.status(200).json({ success: true, message: 'Attendance submitted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error submitting attendance', error: error.message });
    }
});

// Submit marks endpoint
app.post('/submit-marks', async (req, res) => {
    const marksArray = req.body; // Expecting an array of marks

    try {
        // Create a new instance of the MarksModel
        const MarksModel = marksConnection.model('Marks', marksSchema, 'marks');

        // Use Promise.all to save all marks at once
        await Promise.all(marksArray.map(async (mark) => {
            const newMarks = new MarksModel({
                rollno: mark.rollno,
                studentName: mark.studentName,
                collegeID: mark.collegeID,
                ia1: mark.ia1,
                ia2: mark.ia2,
                semester: mark.semester,
                subjectCode: mark.subjectCode
            });
            await newMarks.save();
        }));

        res.status(200).json({ success: true, message: 'Marks submitted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error submitting marks', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

