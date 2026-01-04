const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/university_portal')
    .then(() => console.log('MongoDB Connected for seeding...'))
    .catch(err => console.error(err));

// Seed data
const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Course.deleteMany({});

        // Create demo user
        const user = await User.create({
            username: 'student',
            password: '123456',
            name: 'John Doe',
            studentId: 'STU-2026-001',
            email: 'john.doe@university.edu',
            department: 'Computer Science',
            semester: '4th Semester'
        });

        console.log('Demo user created:', user.username);

        // Create courses
        const courses = await Course.insertMany([
            { code: 'CS101', name: 'Introduction to Programming', credits: 3, instructor: 'Dr. Smith' },
            { code: 'CS201', name: 'Data Structures', credits: 4, instructor: 'Dr. Johnson' },
            { code: 'CS301', name: 'Database Systems', credits: 3, instructor: 'Dr. Williams' },
            { code: 'MATH101', name: 'Calculus I', credits: 3, instructor: 'Dr. Brown' }
        ]);

        console.log(`${courses.length} courses created`);
        console.log('\n✅ Database seeded successfully!');
        console.log('\nDemo Credentials:');
        console.log('Username: student');
        console.log('Password: 123456');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
