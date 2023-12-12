const express = require('express');
const app = express();
// Simulated data from Kubernetes ConfigMap and Secret
const usernameFromConfigMap = process.env.username;
const emailFromConfigMap = process.env.email;
const mobileFromSecret = process.env.mobile; // Replace with actual data retrieved from Secret
app.get('/user-info', (req, res) => {
    const userInfoHtml = `
        <html>
        <head>
            <title>User Information</title>
        </head>
        <body>
            <h1>User Information</h1>
            <div>
                <p><strong>Username:</strong> ${usernameFromConfigMap}</p>
                <p><strong>Email:</strong> ${emailFromConfigMap}</p>
                <p><strong>Mobile:</strong> ${mobileFromSecret}</p>
            </div>
        </body>
        </html>
    `;
    // Sending the HTML content with the injected values to the client
    res.send(userInfoHtml);
});
const PORT = process.env.PORT ||3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
