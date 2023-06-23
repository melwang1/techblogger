const router = require('express').Router();
const sequilize = require('../config/connection');
const { Comment, Post, User } = require('../models');



router.get('/', async (req, res) => {
  try {

    // const postData = await Post.findAll({
     
    // })
    // const post = postData.get({ plain: true });
    res.render("homepage",{loggedIn:req.session.loggedIn})
  }
  catch(err){
    if(err) console.log("Homepage",err)
  }
    });



router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  console.log('logged_in')
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;

  }

  res.render('signup');
})

module.exports = router;
