const { Member } = require('./model');
const mongoose = require('mongoose');

const queries = {
    getAllMembers: async function(filter) {
        try {
          const results = await Member.aggregate([
            { $match: filter },
            {
              $lookup: {
                from: 'memberdetails',
                localField: 'name',
                foreignField: 'name',
                as: 'details'
              }
            },
            { $unwind: { path: '$details', preserveNullAndEmptyArrays: true } },
            {
              $project: {
                _id: 1,
                name: 1,
                description: 1,
                age: 1,
                image_url: 1,
                gender: 1,
                ranking: { $ifNull: ["$details.ranking", null] }
              }
            }
          ]);
        //   console.log('Aggregated Results:', JSON.stringify(results, null, 2));
          return results;
        } catch (error) {
          console.error('Error getting all members:', error);
          throw error;
        }
    },

    addMember: async function(newMemberData) {
        const newMember = new Member({
            _id: new mongoose.Types.ObjectId(),
            name: newMemberData.name,
            description: newMemberData.description,
            age: newMemberData.age,
            image_url: newMemberData.image_url,
            gender: newMemberData.gender
          });

          try{
            const result = await newMember.save();
            return result;
          } catch (error) {
            console.error('Error adding new member:', error);
            throw error;
          }
    },

    deleteMember: async function(memberId) {
        try {
            const result = await Member.findByIdAndDelete(memberId);
            return result;
        } catch (error) {
            console.error('Error deleting member:', error);
            throw error;
        }
    },

    deleteAllMembers: async function() {
        try {
            const result = await Member.deleteMany({});
            return result;
        } catch (error) {
            console.error('Error deleting all members:', error);
            throw error;
        }
    },

    updateMember: async function(id, updatedMemberData) {
        try {
            const result = await Member.findByIdAndUpdate(id, updatedMemberData, {new: true});
            return result;
        } catch (error) {
            console.error('Error updating member:', error);
            throw error;
        }
    },

    getMembersByAgeRange: async function(minAge, maxAge) {
        // try {
        //   const result = await Member.find({
        //     age: { $gte: minAge, $lte: maxAge }
        //   });
        //   return result;
        // } catch (error) {
        //   console.error('Error getting members by age range:', error);
        //   throw error;
        // }
        try {
            const results = await Member.aggregate([
              { $match: { age: { $gte: minAge, $lte: maxAge } } },
              {
                $lookup: {
                  from: 'memberdetails',
                  localField: 'name',
                  foreignField: 'name',
                  as: 'details'
                }
              },
              { $unwind: { path: '$details', preserveNullAndEmptyArrays: true } },
              {
                $project: {
                  _id: 1,
                  name: 1,
                  description: 1,
                  age: 1,
                  image_url: 1,
                  gender: 1,
                  ranking: { $ifNull: ["$details.ranking", null] }
                }
              }
            ]);
            return results;
            
        } catch (error) {
            console.error('Error getting members by age range:', error);
            throw error;
        }
        
    }

};

module.exports = queries;