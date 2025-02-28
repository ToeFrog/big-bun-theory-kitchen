
import express from 'express';
import path from 'path';
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// For any requests that don't match static files, return the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Get port from environment variable or default to 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
