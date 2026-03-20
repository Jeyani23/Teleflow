const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, // Use an App Password, not your login password
    },
  });

  // 2. Define email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Message from ${name}`,
    text: message,
  };

  // 3. Send it
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email Sent!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};