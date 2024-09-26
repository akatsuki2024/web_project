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

// // Connect to MongoDB (IT-Students database)
// mongoose.connect('mongodb://127.0.0.1:27017/IT-Students', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Connected to MongoDB IT-Students');
// })
// .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
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

// // Pre-existing collection names for each semester
// const semesterCollections = {
//     "III": "IT-Semester-III",
//     "IV": "IT-Semester-IV",
//     "V": "IT-Semester-V",
//     "VI": "IT-Semester-VI",
//     "VII": "IT-Semester-VII",
//     "VIII": "IT-Semester-VIII"
// };

// // Helper function to get the collection name based on the selected semester
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

// // Connect to MongoDB (IT-Students database)
// mongoose.connect('mongodb://127.0.0.1:27017/IT-Students')
// .then(() => {
//     console.log('Connected to MongoDB IT-Students');
// })
// .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
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

// // Schema for teacher registration
// const teacherSchema = new mongoose.Schema({
//     username: String,
//     fullname: String,
//     employeeid: String,
//     phoneno: String,
//     address: String,
//     subjects: Object, // Will store subjects for each semester in an object format { "III": "subject1", "IV": "subject2", ... }
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
//             subjects: JSON.parse(subjects), // Parsing the subjects from stringified JSON
//             password
//         };

//         // Define the collection name for teachers
//         const TeacherModel = mongoose.model('Teachers', teacherSchema, 'Teachers');

//         // Save the teacher data in the 'Teachers' collection
//         const newTeacher = new TeacherModel(teacherData);
//         await newTeacher.save();

//         console.log('Teacher registered successfully');
//         res.status(200).json({ message: 'Teacher registered successfully' });
//     } catch (error) {
//         console.error('Error registering teacher:', error); // Log any errors
//         res.status(500).json({ message: 'Error registering teacher', error: error.message });
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

// // Schema for teacher registration
// const teacherSchema = new mongoose.Schema({
//     username: String,
//     fullname: String,
//     employeeid: String,
//     phoneno: String,
//     address: String,
//     subjects: Object, // Will store subjects for each semester in an object format { "III": "subject1", "IV": "subject2", ... }
//     password: String
// });


const teacherSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    employeeid: String,
    phoneno: String,
    address: String,
    subjects: Object, // Store { "III": { "code": "subject_code", "name": "subject_name" }, ... }
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
        const selectedSubjects = req.body.subjects || [];  // Default empty array if no subjects are selected

        console.log('Received Student Data:', req.body);

        // Validate required fields
        if (!username || !fullname || !collegeid || !phoneno || !address || !rollno || !sem || !password) {
            console.log('Missing required fields:', req.body);
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Prepare student data
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
//             subjects: JSON.parse(subjects), // Parsing the subjects from stringified JSON
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


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
