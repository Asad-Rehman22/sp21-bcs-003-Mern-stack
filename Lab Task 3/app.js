
const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10; 
    const skip = (page - 1) * pageSize;

    const filter = {}; /
    if (req.query.username) {
      filter.username = { $regex: new RegExp(req.query.username, 'i') };
    }


    const users = await User.find(filter)
      .skip(skip)
      .limit(pageSize);

    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / pageSize);

    res.render('users/index', { users, page, totalPages });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});


