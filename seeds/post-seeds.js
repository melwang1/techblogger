const { post } = require('../controllers/homeRoutes');
const Post = require ('../models');

const postData = [
    {
        title: "Javascript Basics",
        description: "Do you want to learn how to use Javascript? Look no further here are the basics",
        user_id: 1,
    },

    {
        title: "Why is MVC so important? ",
        description: "MVC allows developers to maintian a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller later for application logic.",
        user_id: 2,
    },

    {
        title: "Authentication vs. Authorization",
        description: "There is a differnce between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.",
        user_id: 3,
    },

    {
        title: "Object-Relational Mapping",
        description: "I have really loved learning about ORMs. It;s really simplified the way I create queries in SQL!",
        user_id: 4,
    },
];

// const seedPosts = () => Post.bulkCreate(PostData);

module.exports = postData;

