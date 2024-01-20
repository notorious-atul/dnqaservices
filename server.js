const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML fom
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/quality', (req, res) => {
    res.sendFile(__dirname + '/quality_modal.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { email } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'atul4055@gmail.com',
            pass: 'btlx tkws npsf wjfv',
        },
    });

    const mailOptions = {
        from: 'atul4055@gmail.com',
        to: 'atul40555@gmail.com', // Your email address
        subject: 'New Booking Request',
        text: `New booking request from: ${email}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Booking request submitted successfully!');
        }
    });
});

// POST endpoint for form submission
app.post('/submit-form', (req, res) => {
    // Extract form data from the request body
    const { services } = req.body;

    // Log the form data (replace this with actual submission logic)
    console.log('Form submitted with services:', services);

    // Send email (replace this with your email configuration)
    sendEmail(services);

    // Send a response to the client
    res.json({ message: 'Form submitted successfully' });
});

// Nodemailer configuration (replace with your SMTP settings)
const serviceTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'atul4055@gmail.com',
        pass: 'btlx tkws npsf wjfv',
    },
});

function sendEmail(services) {
    if (services && Array.isArray(services)) {
        const mailOptions = {
            from: 'atul4055@gmail.com',
            to: 'atul4055@gmail.com',
            subject: 'New Form Submission',
            text: `Services selected: ${services.join(', ')}`,
        };

        serviceTransporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } else {
        console.error('Invalid or undefined services array');
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
