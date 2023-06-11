const sequelize = require('../config/connection');
const seedUser = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require ('./comments-seeds');

const seedData = async () => {
    await sequelize.sync ({force: true});
    console.log('Database Synced')

    await seedUsers ();
    console.log('Users Synced');

    await seedPosts ();
    console.log('Post Synced')

    await seedComments ();
    console.log('Comments Synced')
    process.exit(0);
  };
  
  seedAll();