const betterSqlite3 = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const dbPath = path.resolve(__dirname, 'admission.db');

// Create directory for file uploads if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to database
const db = betterSqlite3(dbPath);


db.exec(`CREATE TABLE IF NOT EXISTS applicants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  middleName TEXT,
  suffix TEXT,
  contact TEXT NOT NULL,
  gender TEXT NOT NULL,
  birthdate TEXT NOT NULL,
  nationality TEXT NOT NULL,
  country TEXT NOT NULL,
  address TEXT NOT NULL,
  schoolName TEXT NOT NULL,
  academicStrand TEXT NOT NULL,
  academicTrack TEXT NOT NULL,
  yearGraduated INTEGER NOT NULL,
  programChoice1 TEXT NOT NULL,
  programChoice2 TEXT NOT NULL,
  programChoice3 TEXT NOT NULL,
  examDate TEXT NOT NULL,
  schoolYear TEXT NOT NULL,
  semester TEXT NOT NULL,
  paymentProofData TEXT,
  paymentProofType TEXT,
  applicationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

console.log('Connected to the admission database.');

module.exports = db;