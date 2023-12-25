const express = require('express');
const mongoose=require('mongoose')
const connectDB=require('./config/db')
const cors = require('cors');
require('dotenv').config();

connectDB()
const app = express();

app.use(cors());
const port = 3000;

const crypto = require('crypto');
const ADMIN_SECRET_KEY = process.env.SECRET_KEY;
// Generate a random 32-byte key
const secret = crypto.randomBytes(32);

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-ctr', secret, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
}

function decrypt(text) {
  // Assume that the concatenated string is directly IV + content
  const iv = Buffer.from(text.substring(0, 32), 'hex'); // Assuming IV length is 32
  const encryptedText = Buffer.from(text.substring(32), 'hex');

  // Create a decipher with the provided IV and secret key
  const decipher = crypto.createDecipheriv('aes-256-ctr', secret, iv);

  // Decrypt the text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  decrypted = decrypted.toString('utf8');

  return decrypted;
}

app.get('/secret', (req, res) => {
  const email = req.query.email;
  const encryptedEmail = encrypt(email);
  res.json({encryptedEmail });
});

app.get('/decode',(req,res)=>{
  if(ADMIN_SECRET_KEY != req.query.secret){
    res.status(403).json({message:'Invalid secret key'});
  }
  const encryptedEmail = req.query.email;
  const decryptedEmail = decrypt(encryptedEmail);
  res.json({ message: decryptedEmail });
});

app.use('/email',require('./routes/emailRoute'))

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});