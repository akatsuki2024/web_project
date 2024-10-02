






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




// parth working code
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

// // Route to submit marks to the Marks database
// // Route to get existing marks data for a subject and semester
// app.get('/get-marks/:semester/:subjectCode', async (req, res) => {
//     const { semester, subjectCode } = req.params;

//     try {
//         // Use uppercase for the collection name
//         const collectionName = `marks_${semester.toUpperCase()}_${subjectCode.toUpperCase()}`;
//         const MarksModel = marksConnection.model('Marks', marksSchema, collectionName);

//         // Fetch all marks for the given semester and subject code
//         const marks = await MarksModel.find({});

//         res.status(200).json({ success: true, marks });
//     } catch (error) {
//         console.error('Failed to fetch marks:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch marks', error: error.message });
//     }
// });

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

//         // Use uppercase for the collection name
//         const collectionName = `marks_${semester.toUpperCase()}_${subjectCode.toUpperCase()}`;
//         console.log(`Using collection: ${collectionName}`);

//         // Use the marksConnection to store the data in the Marks database
//         const MarksModel = marksConnection.model('Marks', marksSchema, collectionName);

//         // Save the marks data with upsert (update if exists, insert if not)
//         const updatePromises = marks.map(mark => {
//             const query = { rollno: mark.rollno };
//             const update = {
//                 studentName: mark.studentName,
//                 collegeID: mark.collegeID,
//                 ia1: mark.ia1 !== undefined ? mark.ia1 : null,
//                 ia2: mark.ia2 !== undefined ? mark.ia2 : null,
//                 semester: semester.toUpperCase(),
//                 subjectCode: subjectCode.toUpperCase()
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


// // Route to get existing marks data for a subject and semester
// app.get('/get-marks/:semester/:subjectCode', async (req, res) => {
//     const { semester, subjectCode } = req.params;

//     try {
//         const collectionName = `marks_${semester.toLowerCase()}_${subjectCode.toLowerCase()}`;
//         const MarksModel = marksConnection.model('Marks', marksSchema, collectionName);

//         const marks = await MarksModel.find({});
        
//         res.status(200).json({ success: true, marks });
//     } catch (error) {
//         console.error('Failed to fetch marks:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch marks', error: error.message });
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


// // Route to get attendance records for a specific subject and semester
// app.get('/view-attendance/:semester/:subjectCode', async (req, res) => {
//     const { semester, subjectCode } = req.params;

//     try {
//         // Create the collection name based on the provided semester and subject code
//         const collectionName = `attendance_${semester}_${subjectCode}`;
//         const AttendanceModel = attendanceConnection.model('Attendance', attendanceSchema, collectionName);

//         // Fetch all attendance records for the specified semester and subject code
//         const attendanceRecords = await AttendanceModel.find({});
//         res.status(200).json({ success: true, attendanceRecords });
//     } catch (error) {
//         console.error('Failed to fetch attendance records:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch attendance records', error: error.message });
//     }
// });



// // Route to get existing marks data for a subject and semester
// app.get('/get-marks/:semester/:subjectCode', async (req, res) => {
//     const { semester, subjectCode } = req.params;

//     try {
//         // Use uppercase for the collection name
//         const collectionName = `marks_${semester.toUpperCase()}_${subjectCode.toUpperCase()}`;
//         const MarksModel = marksConnection.model('Marks', marksSchema, collectionName);

//         // Fetch all marks for the given semester and subject code
//         const marks = await MarksModel.find({});

//         res.status(200).json({ success: true, marks });
//     } catch (error) {
//         console.error('Failed to fetch marks:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch marks', error: error.message });
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

// Connect to MongoDB (Marks database for storing marks information)
const marksConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Marks');

marksConnection.on('connected', () => {
    console.log('Connected to MongoDB Marks');
});

marksConnection.on('error', (error) => {
    console.error('Error connecting to Marks database:', error);
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

// Schema for Marks
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

// Student login endpoint
app.post('/login-student', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Get all collections (for all semesters)
        const collections = Object.values(semesterCollections);

        // Try to find the student in any of the collections
        for (const collectionName of collections) {
            const StudentModel = mongoose.model(collectionName, studentSchema, collectionName);
            const student = await StudentModel.findOne({ username, password }); // Fetch student using entered username and password

            if (student) {
                // Successful login, return student data (excluding password)
                const { password, ...studentData } = student.toObject();
                
                // Here, instead of session storage, you can return the student data
                res.status(200).json({ success: true, student: studentData }); // Return the student data
                return;
            }
        }

        // If no student is found, return an error
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    } catch (error) {
        console.error('Error logging in student:', error);
        res.status(500).json({ success: false, message: 'Error logging in student' });
    }
});


// Fetch student info based on username
app.get('/api/student-info/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // First, find the student by username in all collections
        let studentInfo;
        for (const [semester, collectionName] of Object.entries(semesterCollections)) {
            const StudentModel = mongoose.model(collectionName, studentSchema, collectionName);
            studentInfo = await StudentModel.findOne({ username });
            if (studentInfo) break;  // Exit loop if student found
        }

        if (studentInfo) {
            const { password, ...info } = studentInfo.toObject(); // Exclude password
            res.json(info);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        console.error('Error fetching student info:', error);
        res.status(500).json({ message: 'Server error' });
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
        const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
        const teacher = await TeacherModel.findOne({
            $or: [{ username: identifier }, { employeeid: identifier }]
        });

        if (teacher) {
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
    const { username } = req.params;

    try {
        const TeacherModel = teacherConnection.model('Teachers', teacherSchema, 'teachers');
        const teacher = await TeacherModel.findOne({ username });

        if (teacher) {
            res.json({ success: true, subjects: teacher.subjects });
        } else {
            res.json({ success: false, message: 'Teacher not found' });
        }
    } catch (error) {
        console.error('Error fetching teacher subjects:', error);
        res.status(500).json({ success: false });
    }
});

// Route to get students based on the semester and subject
app.get('/get-students/:semester/:subjectCode', async (req, res) => {
    const { semester, subjectCode } = req.params;
    try {
        const collectionName = getCollectionForSemester(semester);
        const StudentModel = mongoose.model(collectionName, studentSchema, collectionName);

        const students = await StudentModel.find({ 'subjects.id': subjectCode });
        res.status(200).json({ success: true, students });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch students' });
    }
});

// Route to submit marks to the Marks database
app.post('/submit-marks', async (req, res) => {
    const { subjectCode, semester, marks } = req.body;

    // Log the received data for debugging
    console.log("Received marks submission:", req.body);

    try {
        // Check if required fields are provided
        if (!subjectCode || !semester || !Array.isArray(marks)) {
            console.error("Invalid data structure received for marks submission");
            return res.status(400).json({ success: false, message: 'Invalid data structure' });
        }

        // Use uppercase for the collection name
        const collectionName = `marks_${semester.toUpperCase()}_${subjectCode.toUpperCase()}`;
        console.log(`Using collection: ${collectionName}`);

        // Use the marksConnection to store the data in the Marks database
        const MarksModel = marksConnection.model('Marks', marksSchema, collectionName);

        // Save the marks data with upsert (update if exists, insert if not)
        const updatePromises = marks.map(mark => {
            const query = { rollno: mark.rollno };
            const update = {
                studentName: mark.studentName,
                collegeID: mark.collegeID,
                ia1: mark.ia1 !== undefined ? mark.ia1 : null,
                ia2: mark.ia2 !== undefined ? mark.ia2 : null,
                semester: semester.toUpperCase(),
                subjectCode: subjectCode.toUpperCase()
            };
            return MarksModel.updateOne(query, update, { upsert: true });
        });

        // Execute all update operations
        await Promise.all(updatePromises);

        res.status(200).json({ success: true, message: 'Marks saved successfully' });
    } catch (error) {
        console.error("Error saving marks:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Failed to save marks', error: error.message });
    }
});


// // Route to get existing marks data for a subject and semester
app.get('/get-marks/:semester/:subjectCode', async (req, res) => {
    const { semester, subjectCode } = req.params;

    try {
        // Use uppercase for the collection name
        const collectionName = `marks_${semester.toUpperCase()}_${subjectCode.toUpperCase()}`;
        const MarksModel = marksConnection.model('Marks', marksSchema, collectionName);

        // Fetch all marks for the given semester and subject code
        const marks = await MarksModel.find({});

        res.status(200).json({ success: true, marks });
    } catch (error) {
        console.error('Failed to fetch marks:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch marks', error: error.message });
    }
});

// Fetch attendance for the student
app.get('/get-attendance/:rollno/:semester', async (req, res) => {
    const { rollno, semester } = req.params;

    try {
        const AttendanceModel = attendanceConnection.model('Attendance', attendanceSchema, 'attendance');
        const attendanceRecords = await AttendanceModel.find({ semester });

        res.json({ success: true, attendanceRecords });
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({ success: false });
    }
});

// Route to submit attendance to the attendance database
app.post('/submit-attendance', async (req, res) => {
    const { date, subjectCode, semester, attendance } = req.body;
    try {
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

// Route to get attendance records for a specific subject and semester
app.get('/view-attendance/:semester/:subjectCode', async (req, res) => {
    const { semester, subjectCode } = req.params;

    try {
        // Create the collection name based on the provided semester and subject code
        const collectionName = `attendance_${semester}_${subjectCode}`;
        const AttendanceModel = attendanceConnection.model('Attendance', attendanceSchema, collectionName);

        // Fetch all attendance records for the specified semester and subject code
        const attendanceRecords = await AttendanceModel.find({});
        res.status(200).json({ success: true, attendanceRecords });
    } catch (error) {
        console.error('Failed to fetch attendance records:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch attendance records', error: error.message });
    }
});

// Fetch marks for the student
app.get('/get-marks/:rollno/:semester', async (req, res) => {
    const { rollno, semester } = req.params;

    try {
        const MarksModel = marksConnection.model('Marks', marksSchema, 'marks');
        const marksRecords = await MarksModel.find({ rollno, semester });

        res.json({ success: true, marksRecords });
    } catch (error) {
        console.error('Error fetching marks records:', error);
        res.status(500).json({ success: false });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
