const express = require('express');
const app = express();
// Simulated data from Kubernetes ConfigMap and Secret
const usernameFromConfigMap = "nivedha";
const emailFromConfigMap = "nivedharavikumar@example.com";
const mobileFromSecret = "**********"; // Replace with actual data retrieved from Secret
app.get('/user-info', (req, res) => {
    // Endpoint to serve user information to the frontend
    res.json({
        username: process.env.username,
        email: process.env.email,
        mobile: process.env.mobile
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
