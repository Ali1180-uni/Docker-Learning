const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User');
const Course = require('./models/Course');

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Store logged in user (simple session simulation)
let currentUser = null;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes

// Home/Login Page
app.get('/', (req, res) => {
    res.render('login', { error: null });
});

// Login POST handler
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ username, password });
        
        if (user) {
            currentUser = user;
            res.redirect('/dashboard');
        } else {
            res.render('login', { error: 'Invalid username or password!' });
        }
    } catch (error) {
        console.error(error);
        res.render('login', { error: 'An error occurred. Please try again.' });
    }
});

// Dashboard Page
app.get('/dashboard', (req, res) => {
    if (!currentUser) {
        return res.redirect('/');
    }
    res.render('dashboard', { 
        studentName: currentUser.name,
        studentId: currentUser.studentId
    });
});

// Courses Page
app.get('/courses', async (req, res) => {
    if (!currentUser) {
        return res.redirect('/');
    }
    try {
        const courses = await Course.find({});
        res.render('courses', { courses });
    } catch (error) {
        console.error(error);
        res.render('courses', { courses: [] });
    }
});

// Profile Page
app.get('/profile', (req, res) => {
    if (!currentUser) {
        return res.redirect('/');
    }
    const profile = {
        name: currentUser.name,
        studentId: currentUser.studentId,
        email: currentUser.email,
        department: currentUser.department,
        semester: currentUser.semester
    };
    res.render('profile', { profile });
});

// Logout
app.get('/logout', (req, res) => {
    currentUser = null;
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`University Portal running at http://localhost:${PORT}`);
});
