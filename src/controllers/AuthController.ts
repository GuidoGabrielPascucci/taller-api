// controllers/authController.js
// const User = require('../models/User');



// login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findByUsername(username);

//   if (user && await user.validatePassword(password)) {
//     req.session.userId = user.id;
//     return res.redirect('/dashboard');
//   } else {
//     res.render('login', { error: 'Invalid username or password' });
//   }
// };

// logout = (req, res) => {
//   req.session.destroy();
//   res.redirect('/login');
// };
