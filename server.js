const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db');
const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handling file uploads
app.use(express.raw({
  type: ['image/*', 'application/pdf'],
  limit: '5mb' // 5MB limit
}));

// Helper function to save file data
function saveFile(fileData, fileType) {
  const fileExt = fileType.split('/')[1];
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = path.join(__dirname, 'uploads', fileName);
  
  fs.writeFileSync(filePath, fileData);
  return fileName;
}

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/apply', (req, res) => {
  res.render('application');
});

// Get all applications (for homepage display)
app.get('/applications', (req, res) => {
  const applications = db.prepare('SELECT * FROM applicants ORDER BY applicationDate DESC').all();
  res.render('applications', { applications });
});

// Handle application form data
app.post('/submit', (req, res) => {
  try {
    // Extract form data
    const {
      firstName, lastName, middleName, suffix, contact, gender, 
      birthdate, nationality, country, address, schoolName, 
      academicStrand, academicTrack, yearGraduated, 
      programChoice1, programChoice2, programChoice3,
      examDate, schoolYear, semester,
      paymentProofData, paymentProofType
    } = req.body;

    // Prepare statement for insertion
    const stmt = db.prepare(`INSERT INTO applicants (
      firstName, lastName, middleName, suffix, contact, gender,
      birthdate, nationality, country, address, schoolName,
      academicStrand, academicTrack, yearGraduated,
      programChoice1, programChoice2, programChoice3,
      examDate, schoolYear, semester, paymentProofData, paymentProofType
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    // Insert data
    const result = stmt.run(
      firstName, lastName, middleName, suffix, contact, gender,
      birthdate, nationality, country, address, schoolName,
      academicStrand, academicTrack, yearGraduated,
      programChoice1, programChoice2, programChoice3,
      examDate, schoolYear, semester, paymentProofData, paymentProofType
    );

    // Get the inserted ID and redirect
    res.redirect('/success?id=' + result.lastInsertRowid);
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).send('Error submitting application. Please try again.');
  }
});

// API endpoint to handle file uploads separately
app.post('/upload-payment-proof', (req, res) => {
  try {
    const contentType = req.headers['content-type'];
    const fileName = saveFile(req.body, contentType);
    res.json({ success: true, fileName });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, error: 'Error uploading file' });
  }
});

app.get('/success', (req, res) => {
  const applicationId = req.query.id;
  res.render('success', { applicationId });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});