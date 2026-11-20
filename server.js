const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

// Serve React production files
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routes
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
