const bcrypt = require('bcrypt');
const db = require('../config/dbConfig');

class User {
    constructor() {
        this.db = db;
    }

    async register(email, password, userDetails) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await this.db.query('INSERT INTO Users (Email, Password) VALUES (?, ?)', [email, hashedPassword]);
            const userId = result.insertId;
            await this.db.query('INSERT INTO UserDetails (UserId, FirstName, LastName, MiddleName, Phone) VALUES (?, ?, ?, ?, ?)', [userId, userDetails.firstName, userDetails.lastName, userDetails.middleName, userDetails.phone]);
            return userId;
        } catch (error) {
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const [users] = await this.db.query('SELECT * FROM Users WHERE Email = ?', [email]);
            return users[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new User();
