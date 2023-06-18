const sequelize = require('../config/connection');
const userData = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comments-seeds');
const { User, Post, Comment } = require("../models");
// const seedPosts = require('./post-seeds');

const seedData = async () => {
  await sequelize.sync({ force: true });
  console.log('Database Synced')

  const userDataRec = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  // await seedUser ();
  // console.log('Users Synced');
  const seedDataPost = await Post.bulkCreate(seedPosts, {
    individualHooks: true,
    returning: true,
  });

  const seedDataComment = await Comment.bulkCreate(seedComments, {
    individualHooks: true,
    returning: true,
  });
  // await seedPosts ();
  // console.log('Post Synced')

  // await seedComments ();
  console.log('Comments Synced', seedDataComment, seedDataPost, userDataRec)
  process.exit(0);
};

seedData();