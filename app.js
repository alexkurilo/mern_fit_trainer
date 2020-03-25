const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const PORT = config.get('PORT') || 5000;
const mongoUri = config.get('mongoUri');

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));

async function start () {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log(`Server error`, e.message);
        process.exit(1);// выйти из процесса
    }
}

start();