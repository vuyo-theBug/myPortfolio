const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON and handle CORS
app.use(bodyParser.json());
app.use(cors());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: 'vuyorh10@gmail.com', // Replace with your email address
    pass: 'Slindile@2011' // Replace with your email password or app-specific password
  }
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Email content
  const mailOptions = {
    from: email, // Sender's email
    to: 'vuyorh10@gmail.com', // Your email address (where you want to receive messages)
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email. Please try again.' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Message sent successfully!' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
