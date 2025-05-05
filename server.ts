import express from 'express';
import cors from 'cors';
import { expressHandler } from '@genkit-ai/express';
import { movieFlow } from './src/app/genkit'; // Adjust path if needed

const app = express();
const PORT = process.env['PORT'] || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for development
app.use(cors());

// Example Genkit endpoint (adjust as needed)
app.post('/api/recommend', expressHandler(movieFlow));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
