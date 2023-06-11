const { Comment } = require ('../models/comments');

const commentData = [

    {
        comment_text: "These were amazing posts! Love to read these.",
        post_id: 2,
        user_id: 3
    },

    {
        comment_text: "Thank you for sharing.",
        post_id: 1,
        user_id: 5
    },

    {
        comment_text: "I never knew there was so much to coding!",
        post_id: 3,
        user_id: 2
    },

    {
        comment_text: "I love the coding community and the value they bring into this world!",
        post_id: 4,
        user_id: 1
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;