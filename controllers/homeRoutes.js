const router = require('express').Router();
const sequilize = require('../config/connection');
const { Comment, Post, User } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }]
    });

    res.render("homepage", { loggedIn: req.session.logged_in ,
      post:postData })
  }
  catch (err) {
    if (err) console.log("Homepage", err)
  }
});



router.get('/post/:id', async (req, res) => {
  try {
    const postId = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }]
    });

    if (!postId) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    const post = postId.get({ plain: true });

    // const comment = await Comment.findAll({
    //   where: {
    //     post_id: req.params.id
    //   },
    //   include: [{ model: User }]
    // })
    console.log(post)

    res.render('post', {
      ...post,
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('dashboard', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard', { loggedIn: req.session.logged_in });
    return;
  }
  console.log('logged_in')
  res.render('login', { loggedIn: req.session.logged_in });
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;

  }

  res.render('signup', { loggedIn: req.session.logged_in });
})

router.get('/logout', (req, res) => {
  res.redirect('/')
})

module.exports = router;
