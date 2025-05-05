import express from 'express';
import cors from 'cors';
import { expressHandler } from '@genkit-ai/express';
import { movieFlow } from './src/app/genkit';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Enable CORS to allow cross-origin requests (adjust as needed)
app.use(cors());

// API endpoint for movie recommendations using Genkit flow
app.post('/api/recommend', expressHandler(movieFlow));

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
