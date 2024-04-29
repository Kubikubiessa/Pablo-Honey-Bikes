 
const bcrypt = require('bcrypt');
const db = require('./config/connection');
const User = require('./models/User');
async function testPasswordHandling() {
 
    db.once('open', async () => {
        console.log('Connected to the database');

        // Example user data
        const userData = {
            username: "testUser",
            email: "test@example.com",
            password: "Password123"
        };

        // Create a user instance
        const user = new User(userData);

        // Save the user to hash the password
        try {
            const savedUser = await user.save();
            console.log('User saved:', savedUser);

            // Test password verification
            const isMatch = await savedUser.isCorrectPassword("Password123");
            console.log('Password matches:', isMatch);
        } catch (error) {
            console.error('Error saving user:', error);
        }

        // Disconnect from the database after testing
        db.close();
    });
}

testPasswordHandling();

