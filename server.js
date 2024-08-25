const express= require('express');
const mongoose=require('mongoose');
const cors= require('cors');
require('dotenv').config();

const app= express();
const PORT=process.env.PORT ||5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highestLowercaseAlphabet = alphabets
    .filter(char => char.length === 1 && char === char.toLowerCase())
    .sort((a, b) => b.localeCompare(a))
    .slice(0, 1);

  res.json({
    is_success: true,
    user_id: "john_doe_17091999", // Replace with actual user_id
    email: "john@xyz.com", // Replace with actual email
    roll_number: "ABCD123", // Replace with actual roll number
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
  });
});

app.get('/bfhl', (req, res) => {
  res.json({operation_code: 1 });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));