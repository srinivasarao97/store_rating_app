const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);
const storeRoutes = require('./routes/storeRoutes');
app.use('/api/stores', storeRoutes);



