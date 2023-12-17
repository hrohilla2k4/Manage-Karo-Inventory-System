// apiRoutes.js

const express = require('express');
const router = express.Router();

// Define routes and their handlers
router.get('/users', (req, res) => {
    // Logic for fetching users
    res.send('Get all users');
});

router.post('/users', (req, res) => {
    // Logic for creating a new user
    res.send('Create a user');
});




//Exporting the route , so that it can be used outside this file. 
module.exports = router;
