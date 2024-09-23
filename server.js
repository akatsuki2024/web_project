
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

//     const Teacher = attendanceDB.model('Teacher', new mongoose.Schema({
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

// // -------- Submit Attendance API --------
// app.post('/attendance/submit', async (req, res) => {
//   const { branch, year, division, date, attendanceData } = req.body;

//   try {
//     const collectionName = `${branch}-${year}-${division || ''}`; // Division will be '' for IT
//     const Attendance = attendanceDB.model('Attendance', new mongoose.Schema({
//       collegeID: String,
//       attendanceStatus: String,
//       date: { type: Date, default: Date.now }
//     }), collectionName);

//     for (let record of attendanceData) {
//       await Attendance.updateOne(
//         { collegeID: record.collegeID, date: new Date(date) },
//         { $set: { attendanceStatus: record.attendanceStatus }, $setOnInsert: { date: new Date(date) } },
//         { upsert: true }
//       );
//     }

//     res.status(200).json({ message: 'Attendance submitted successfully!' });
//   } catch (error) {
//     console.error('Error submitting attendance:', error);
//     res.status(500).json({ error: 'Error submitting attendance' });
//   }
// });

// // -------- Submit Marks API --------
// app.post('/marks/submit', async (req, res) => {
//   const { branch, year, division, marksData } = req.body;

//   let collectionName = `${branch}-${year}`;
//   if (branch !== 'IT') {
//     collectionName += `-${division}`;
//   }

//   try {
//     const Marks = marksDb.model('Marks', marksSchema, collectionName);

//     for (let record of marksData) {
//       const updateData = {
//         studentName: record.studentName,
//         collegeID: record.collegeID,
//         ia1: record.ia1 !== undefined ? record.ia1 : null,
//         ia2: record.ia2 !== undefined ? record.ia2 : null
//       };

//       await Marks.updateOne(
//         { rollNo: record.rollNo },
//         { $set: updateData },
//         { upsert: true }
//       );
//     }

//     res.status(200).json({ message: 'Marks submitted successfully!' });
//   } catch (error) {
//     console.error('Error submitting marks:', error);
//     res.status(500).json({ error: 'Error submitting marks' });
//   }
// });

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



// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });






























//---------------------------------------------------------------------
// MAIN CODE








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

//     const Teacher = attendanceDB.model('Teacher', new mongoose.Schema({
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

// // -------- Submit Attendance API (Updated) --------
// app.post('/attendance/submit', async (req, res) => {
//   const { branch, year, division, date, attendanceData } = req.body;

//   try {
//     const collectionName = `${branch}-${year}-${division || ''}`; // Division will be '' for IT
//     const Attendance = attendanceDB.model('Attendance', new mongoose.Schema({
//       collegeID: String,
//       rollNo: String,   // Added roll number
//       name: String,     // Added name
//       branch: String,   // Added branch
//       division: String, // Added division
//       attendanceStatus: String,
//       date: { type: Date, default: Date.now }
//     }), collectionName);

//     for (let record of attendanceData) {
//       await Attendance.updateOne(
//         { collegeID: record.collegeID, date: new Date(date) },
//         {
//           $set: {
//             attendanceStatus: record.attendanceStatus,
//             rollNo: record.rollNo,     // Add rollNo in the update
//             name: record.name,         // Add name in the update
//             branch: branch,            // Store the branch
//             division: division || null // Store the division (null for IT)
//           },
//           $setOnInsert: { date: new Date(date) }
//         },
//         { upsert: true }
//       );
//     }

//     res.status(200).json({ message: 'Attendance submitted successfully!' });
//   } catch (error) {
//     console.error('Error submitting attendance:', error);
//     res.status(500).json({ error: 'Error submitting attendance' });
//   }
// });

// // -------- Submit Marks API --------
// app.post('/marks/submit', async (req, res) => {
//   const { branch, year, division, marksData } = req.body;

//   let collectionName = `${branch}-${year}`;
//   if (branch !== 'IT') {
//     collectionName += `-${division}`;
//   }

//   try {
//     const Marks = marksDb.model('Marks', marksSchema, collectionName);

//     for (let record of marksData) {
//       const updateData = {
//         studentName: record.studentName,
//         collegeID: record.collegeID,
//         ia1: record.ia1 !== undefined ? record.ia1 : null,
//         ia2: record.ia2 !== undefined ? record.ia2 : null
//       };

//       await Marks.updateOne(
//         { rollNo: record.rollNo },
//         { $set: updateData },
//         { upsert: true }
//       );
//     }

//     res.status(200).json({ message: 'Marks submitted successfully!' });
//   } catch (error) {
//     console.error('Error submitting marks:', error);
//     res.status(500).json({ error: 'Error submitting marks' });
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

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });




//---------------------------------------------------------------------------------

















const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();
const port = 5000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Connect to 'database' MongoDB for student registration
const studentDB = mongoose.createConnection('mongodb://127.0.0.1:27017/database');

// Connect to 'attendance' MongoDB
const attendanceDB = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance');

// Connect to 'marks' MongoDB for marks submission and fetching
const marksDb = mongoose.createConnection('mongodb://127.0.0.1:27017/marks');

// Schema for student registration
const studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  collegeID: String,
  branch: String,
  year: String,
  contactNumber: String,
  address: String,
  rollNo: String,
  division: String
});

// Schema for marks submission
const marksSchema = new mongoose.Schema({
  rollNo: String,
  studentName: String,
  collegeID: String,
  ia1: { type: Number, default: null },
  ia2: { type: Number, default: null }
});

// -------- Student Registration API --------
app.post('/register/student', async (req, res) => {
  try {
    const studentData = req.body;
    console.log('Received Student Data:', studentData);

    // Determine the collection name based on branch, year, and division
    let collectionName = "students";  // Default collection
    if (studentData.branch === "EXTC") {
      collectionName = `EXTC-${studentData.year}-${studentData.division}`;
    } else if (studentData.branch === "Comps") {
      collectionName = `Comps-${studentData.year}-${studentData.division}`;
    } else if (studentData.branch === "IT") {
      collectionName = `IT-${studentData.year}-`; // No division for IT
    }

    // Dynamically create a model for the correct collection
    const DynamicStudent = studentDB.model('Student', studentSchema, collectionName);

    // Create a new student document in the correct collection
    const newStudent = new DynamicStudent(studentData);
    await newStudent.save();

    res.status(200).json({ message: 'Student registration successful!' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Error registering student' });
  }
});

// -------- Teacher Registration API --------
app.post('/register/teacher', async (req, res) => {
  try {
    const teacherData = req.body;
    console.log('Received Teacher Data:', teacherData);

    const Teacher = attendanceDB.model('Teacher', new mongoose.Schema({
      username: String,
      password: String,
      name: String,
      employeeID: String,
      department: String,
      contactNumber: String,
      address: String
    }), 'teachers');

    const newTeacher = new Teacher(teacherData);
    await newTeacher.save();

    res.status(200).json({ message: 'Teacher registration successful!' });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ error: 'Error registering teacher' });
  }
});

// -------- Submit Attendance API --------
app.post('/attendance/submit', async (req, res) => {
  const { branch, year, division, date, attendanceData } = req.body;

  try {
    let collectionName;
    if (branch === 'IT') {
      collectionName = `IT-${year}-`; // For IT, no division
    } else {
      collectionName = `${branch}-${year}-${division}`; // For other branches, include division
    }

    const Attendance = attendanceDB.model('Attendance', new mongoose.Schema({
      collegeID: String,
      rollNo: String,
      name: String,
      branch: String,
      division: String,
      attendanceStatus: String,
      date: { type: Date, default: Date.now }
    }), collectionName);

    for (let record of attendanceData) {
      await Attendance.updateOne(
        { collegeID: record.collegeID, date: new Date(date) },
        { 
          $set: { 
            attendanceStatus: record.attendanceStatus, 
            rollNo: record.rollNo,     
            name: record.name,         
            branch: branch,            
            division: division || null 
          }, 
          $setOnInsert: { date: new Date(date) } 
        },
        { upsert: true }
      );
    }

    res.status(200).json({ message: 'Attendance submitted successfully!' });
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({ error: 'Error submitting attendance' });
  }
});

// -------- Submit Marks API --------
app.post('/marks/submit', async (req, res) => {
  const { branch, year, division, marksData } = req.body;

  let collectionName = `${branch}-${year}`;
  if (branch !== 'IT') {
    collectionName += `-${division}`;
  }

  try {
    const Marks = marksDb.model('Marks', marksSchema, collectionName);

    for (let record of marksData) {
      const updateData = {
        studentName: record.studentName,
        collegeID: record.collegeID,
        ia1: record.ia1 !== undefined ? record.ia1 : null,
        ia2: record.ia2 !== undefined ? record.ia2 : null
      };

      await Marks.updateOne(
        { rollNo: record.rollNo },
        { $set: updateData },
        { upsert: true }
      );
    }

    res.status(200).json({ message: 'Marks submitted successfully!' });
  } catch (error) {
    console.error('Error submitting marks:', error);
    res.status(500).json({ error: 'Error submitting marks' });
  }
});

// -------- Fetch Students by Branch, Year, and Division --------
app.get('/students/:branch/:year/:division?', async (req, res) => {
  const { branch, year, division } = req.params;

  let collectionName;
  if (branch === "EXTC" || branch === "Comps") {
    collectionName = `${branch}-${year}-${division}`;
  } else if (branch === "IT") {
    collectionName = `IT-${year}-`;
  }

  try {
    const DynamicStudent = studentDB.model('Student', studentSchema, collectionName);
    const students = await DynamicStudent.find({});
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Error fetching students' });
  }
});

// -------- Fetch Attendance by Branch, Year, Division, and Date --------
app.get('/attendance/:branch/:year/:division?', async (req, res) => {
  const { branch, year, division } = req.params;
  const { month } = req.query;

  // Construct the collection name
  let collectionName;
  if (branch === 'IT') {
    collectionName = `IT-${year}-`; // No division for IT
  } else {
    collectionName = `${branch}-${year}-${division}`;
  }

  try {
    const Attendance = attendanceDB.model('Attendance', new mongoose.Schema({
      collegeID: String,
      rollNo: String,
      name: String,
      branch: String,
      division: String,
      attendanceStatus: String,
      date: { type: Date, default: Date.now }
    }), collectionName);

    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // End of the month

    const attendanceRecords = await Attendance.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });

    res.json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Error fetching attendance' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
