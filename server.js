const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { cart, email } = req.body;

    let emailContent = '<h1>Order Receipt</h1>';
    emailContent += '<table><tr><th>Product</th><th>Quantity</th><th>Price</th></tr>';
    cart.forEach(item => {
        emailContent += `<tr><td>${item.name}</td><td>${item.quantity}</td><td>$${item.price.toFixed(2)}</td></tr>`;
    });
    emailContent += '</table>';

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',  // Replace with your email
            pass: 'yourpassword'         // Replace with your email password
        }
    });

    const mailOptions = {
        from: 'youremail@gmail.com',    // Replace with your email
        to: email,
        subject: 'Order Receipt',
        html: emailContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ success: false, message: error.message });
        }
        res.send({ success: true, message: 'Email sent: ' + info.response });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
