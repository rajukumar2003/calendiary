// backend/src/firebaseAdmin.js
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Read the service account key file
const serviceAccountPath = path.resolve('src/triply-d7e31-firebase-adminsdk-xuimf-805aa5de4d.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
