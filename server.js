
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Initialize the app
// const app = express();
// const port = 5000;

// // Middleware to parse JSON and enable CORS
// app.use(express.json());
// app.use(cors());

// // Connect to 'database' MongoDB for student registration
// const studentDB = mongoose.createConnection('mongodb://127.0.0.1:27017/database');

// // Connect to 'attendance' MongoDB
// const attendanceDB = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance');

// // Connect to 'marks' MongoDB for marks submission and fetching
// const marksDb = mongoose.createConnection('mongodb://127.0.0.1:27017/marks');

// // Schema for student registration
// const studentSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   name: String,
//   collegeID: String,
//   branch: String,
//   year: String,
//   contactNumber: String,
//   address: String,
//   rollNo: String,
//   division: String
// });

// // Schema for marks submission
// const marksSchema = new mongoose.Schema({
//   rollNo: String,
//   studentName: String,
//   collegeID: String,
//   ia1: { type: Number, default: null },
//   ia2: { type: Number, default: null }
// });

// // -------- Student Registration API --------
// app.post('/register/student', async (req, res) => {
//   try {
//     const studentData = req.body;
//     console.log('Received Student Data:', studentData);

//     // Determine the collection name based on branch, year, and division
//     let collectionName = "students";  // Default collection
//     if (studentData.branch === "EXTC") {
//       if (studentData.year === "Second") {
//         collectionName = `EXTC-SE-${studentData.division}`;
//       } else if (studentData.year === "Third") {
//         collectionName = `EXTC-TE-${studentData.division}`;
//       } else if (studentData.year === "Fourth") {
//         collectionName = `EXTC-BE-${studentData.division}`;
//       }
//     } else if (studentData.branch === "Comps") {
//       if (studentData.year === "Second") {
//         collectionName = `CS-SE-${studentData.division}`;
//       } else if (studentData.year === "Third") {
//         collectionName = `CS-TE-${studentData.division}`;
//       } else if (studentData.year === "Fourth") {
//         collectionName = `CS-BE-${studentData.division}`;
//       }
//     } else if (studentData.branch === "IT") {
//       if (studentData.year === "Second") {
//         collectionName = `IT-SE`;
        
//       } else if (studentData.year === "Third") {
//         collectionName = `IT-TE`;
//       } else if (studentData.year === "Fourth") {
//         collectionName = `IT-BE`;
//       }
//     }

//     // Dynamically create a model for the correct collection
//     const DynamicStudent = studentDB.model('Student', studentSchema, collectionName);

//     // Create a new student document in the correct collection
//     const newStudent = new DynamicStudent(studentData);
//     await newStudent.save();

//     res.status(200).json({ message: 'Student registration successful!' });
//   } catch (error) {
//     console.error('Error registering student:', error);
//     res.status(500).json({ error: 'Error registering student' });
//   }
// });

// // -------- Teacher Registration API --------
// app.post('/register/teacher', async (req, res) => {
//   try {
//     const teacherData = req.body;
//     console.log('Received Teacher Data:', teacherData);

//     //(om change) Use 'studentDB' to store teacher data in the 'teachers' collection of the 'database' database
//     const Teacher = studentDB.model('Teacher', new mongoose.Schema({
//       username: String,
//       password: String,
//       name: String,
//       employeeID: String,
//       department: String,
//       contactNumber: String,
//       address: String
//     }), 'teachers');

//     const newTeacher = new Teacher(teacherData);
//     await newTeacher.save();

//     res.status(200).json({ message: 'Teacher registration successful!' });
//   } catch (error) {
//     console.error('Error registering teacher:', error);
//     res.status(500).json({ error: 'Error registering teacher' });
//   }
// });


// // // -------- Submit Attendance API --------
// // -------- Submit Attendance API (Updated for Existing Collections) --------
// app.post('/attendance/submit', async (req, res) => {
//   const { branch, year, division, date, attendanceData } = req.body;

//   try {
//       // Construct the collection name based on branch, year, and division
//       let collectionName = '';

//       // For IT branch, we don't need division
//       if (branch === 'IT') {
//           collectionName = `IT-${year}`;
//       } else {
//           // For other branches like Comps and Extc, division is required
//           collectionName = `${branch}-${year}-${division}`;
//       }

//       // Use the fixed collection name, no dynamic creation of collections
//       const Attendance = attendanceDB.collection(collectionName); // Use collection() instead of model()

//       for (let record of attendanceData) {
//           await Attendance.updateOne(
//               { collegeID: record.collegeID, date: new Date(date) },
//               {
//                   $set: {
//                       attendanceStatus: record.attendanceStatus,
//                       rollNo: record.rollNo,
//                       name: record.name,
//                       branch: branch,
//                       year: year,
//                       division: division || '' // Division is empty string for IT branch
//                   },
//                   $setOnInsert: { date: new Date(date) }
//               },
//               { upsert: true } // Update or insert
//           );
//       }

//       res.status(200).json({ message: 'Attendance submitted successfully!' });
//   } catch (error) {
//       console.error('Error submitting attendance:', error);
//       res.status(500).json({ error: 'Error submitting attendance' });
//   }
// });



// // -------- Submit Marks API --------
// app.post('/marks/submit', async (req, res) => {
//     const { branch, year, division, marksData } = req.body;
  
//     let collectionName = `${branch}-${year}`;
//     if (branch !== 'IT') {
//       collectionName += `-${division}`;
//     }
  
//     try {
//       const Marks = marksDb.model('Marks', marksSchema, collectionName);
  
//       for (let record of marksData) {
//         // Prepare the update object, which only updates ia1 and ia2 if they are present in the submission
//         const updateData = {};
//         if (record.ia1 !== undefined && record.ia1 !== null) {
//           updateData.ia1 = record.ia1;
//         }
//         if (record.ia2 !== undefined && record.ia2 !== null) {
//           updateData.ia2 = record.ia2;
//         }
  
//         // Only update the fields provided in the current submission
//         await Marks.updateOne(
//           { rollNo: record.rollNo },
//           { $set: updateData, $setOnInsert: { studentName: record.studentName, collegeID: record.collegeID } },
//           { upsert: true } // Upsert to create the record if it doesn't exist
//         );
//       }
  
//       res.status(200).json({ message: 'Marks submitted successfully!' });
//     } catch (error) {
//       console.error('Error submitting marks:', error);
//       res.status(500).json({ error: 'Error submitting marks' });
//     }
//   });
  

// // -------- Fetch Marks for a Class API (Updated) --------
// app.get('/marks/:branch/:year/:division?', async (req, res) => {
//   const { branch, year, division } = req.params;

//   // Construct the collection name based on branch, year, and division
//   let collectionName;
  
//   // For IT branch, don't include division in the collection name
//   if (branch === 'IT') {
//     collectionName = `IT-${year}`;
//   } else {
//     // For other branches, include division in the collection name
//     collectionName = `${branch}-${year}-${division}`;
//   }

//   try {
//     const Marks = marksDb.model('Marks', marksSchema, collectionName);
//     const marks = await Marks.find({});

//     if (marks.length === 0) {
//       return res.status(404).json({ message: 'No marks found for the selected criteria.' });
//     }

//     res.json(marks);
//   } catch (error) {
//     console.error('Error fetching marks:', error.message);
//     res.status(500).json({ error: 'Error fetching marks. Please check your query and database.' });
//   }
// });


// // -------- Fetch Students by Branch, Year, and Division --------
// app.get('/students/:branch/:year/:division?', async (req, res) => {
//   const { branch, year, division } = req.params;

//   let collectionName;
//   if (branch === "EXTC") {
//     if (year === "Second") collectionName = `EXTC-SE-${division}`;
//     else if (year === "Third") collectionName = `EXTC-TE-${division}`;
//     else if (year === "Fourth") collectionName = `EXTC-BE-${division}`;
//   } else if (branch === "Comps") {
//     if (year === "Second") collectionName = `CS-SE-${division}`;
//     else if (year === "Third") collectionName = `CS-TE-${division}`;
//     else if (year === "Fourth") collectionName = `CS-BE-${division}`;
//   } else if (branch === "IT") {
//     if (year === "Second") collectionName = `IT-SE`;
//     else if (year === "Third") collectionName = `IT-TE`;
//     else if (year === "Fourth") collectionName = `IT-BE`;
//   }

//   try {
//     const DynamicStudent = studentDB.model('Student', studentSchema, collectionName);
//     const students = await DynamicStudent.find({});
//     res.json(students);
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({ error: 'Error fetching students' });
//   }
// });






// // attendance view -------------------------------------------------
// // Fetch Attendance by Month API
// app.get('/attendance/:branch/:year/:division?', async (req, res) => {
//     const { branch, year, division } = req.params;
//     const { month } = req.query;
  
//     // Construct the collection name based on branch, year, and division
//     let collectionName = `${branch}-${year}`;
//     if (branch !== 'IT') {
//       collectionName += `-${division}`;
//     }
  
//     try {
//       const Attendance = attendanceDB.model('Attendance', new mongoose.Schema({
//         collegeID: String,
//         rollNo: String,
//         name: String,
//         attendanceStatus: String,
//         date: { type: Date, default: Date.now }
//       }), collectionName);
  
//       // Define start and end date for the selected month
//       const startDate = new Date(`${month}-01`);
//       const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
  
//       const attendanceRecords = await Attendance.find({
//         date: {
//           $gte: startDate,
//           $lte: endDate
//         }
//       });
  
//       if (attendanceRecords.length === 0) {
//         return res.status(404).json({ message: 'No attendance records found for the selected criteria.' });
//       }
  
//       res.json(attendanceRecords);
//     } catch (error) {
//       console.error('Error fetching attendance:', error.message);
//       res.status(500).json({ error: 'Error fetching attendance. Please check your query and database.' });
//     }
//   });


// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
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

// Connect to MongoDB (IT-Students database)
mongoose.connect('mongodb://127.0.0.1:27017/IT-Students', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB IT-Students');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
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

// Pre-existing collection names for each semester
const semesterCollections = {
    "III": "IT-Semester-III",
    "IV": "IT-Semester-IV",
    "V": "IT-Semester-V",
    "VI": "IT-Semester-VI",
    "VII": "IT-Semester-VII",
    "VIII": "IT-Semester-VIII"
};

// Helper function to get the collection name based on the selected semester
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


