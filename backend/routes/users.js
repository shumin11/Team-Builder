var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const queries = require('../models/queries');
require("dotenv").config();

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('Missing MONGODB_URI in environment.');
  process.exit(1);
}

mongoose.connect(mongoURI).then(() => {
      console.log('Connected to MongoDB');
      
  }).catch(err => {
      console.log(err);
  });


// GET all members
router.get('/', async function(req, res, next) {
  const members = await queries.getAllMembers({});
  console.log(members);
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const offset = (page - 1) * pageSize;
  const paginatedMembers = members.slice(offset, offset + pageSize);
  const totalItems = members.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Disable caching
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');

  // Set Pagination header
  res.set('X-Total-Count', totalItems);
  res.set('X-Total-Pages', totalPages);
  res.set('X-Current-Page', page);
  res.set('X-Page-Size', pageSize);

  return res.send(paginatedMembers);
});

// add a new member
router.post('/add', async function(req, res, next) {
  if (!req.body.name || !req.body.description || !req.body.age || !req.body.image_url) {
    return res.status(400).send('Bad Request');
  }
  const newMember = {
    name: req.body.name,
    description: req.body.description,
    age: req.body.age,
    image_url: req.body.image_url,
    gender: req.body.gender
  };

  try {
    const addedMember = await queries.addMember(newMember);
    return res.status(201).send(addedMember);
  } catch (error) {
    console.error('Error adding new member:', error);
    return res.status(500).send('Internal Server Error');
  }
});

// delete a member
router.delete('/delete/:index', async function(req, res, next) {
  const index = req.params.index;

  try {
    const members = await queries.getAllMembers({});

    if (index < 0 || index >= members.length) {
      return res.status(404).send('Not Found');
    }

    const memberId = members[index]._id;
    await queries.deleteMember(memberId);
    return res.send('Deleted');
  } catch (error) {
    console.error('Error deleting member:', error);
    return res.status(500).send('Internal Server Error');
  }
});

// delete all members
router.delete('/delete', async function(req, res, next) {
  try {
    await queries.deleteAllMembers();
    return res.send('Deleted');
  } catch (error) {
    console.error('Error deleting all members:', error);
    return res.status(500).send('Internal Server Error');
  }
  
});

// update a member
router.put('/update/:index', async function(req, res, next) {
  try {
    const index = req.params.index;
    const members = await queries.getAllMembers({});
    if (index < 0 || index >= members.length) {
      return res.status(404).send('Member Not Found');
    }
    
    const memberId = members[index]._id;
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      age: req.body.age,
      image_url: req.body.image_url,
      gender: req.body.gender
    };
    const updatedMember = await queries.updateMember(memberId, updateData);
    return res.send(updatedMember);
  } catch (error) {
    console.error('Error updating member:', error);
    return res.status(500).send('Internal Server Error');
  }
  
});

// GET members by age range
router.get('/members/age-range', async function(req, res, next) {
  const { minAge, maxAge } = req.query;

  // Disable caching
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');

  try {
    const members = await queries.getMembersByAgeRange(Number(minAge), Number(maxAge));
    // console.log(members);
    return res.send(members);
  } catch (error) {
    console.error('Error getting members by age range:', error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
