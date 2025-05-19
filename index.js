const express = require('express'); // Import Express
const open = require('open');       // Import open module to launch browser

const app = express();              // Create Express app
const PORT = 3000;                  // Define the port number

// Optional: Basic route
app.get('/', (req, res) => {
  res.send('<h1>Hello! Your server is running.</h1>');
});

// Start server and open browser
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
  open('http://localhost:${PORT}'); // This opens the browser automatically
});