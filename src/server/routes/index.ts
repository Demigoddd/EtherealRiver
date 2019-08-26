import { Router } from 'express';
import { authenticate } from 'passport';

import * as User from '../database/models/user';
import * as Room from '../database/models/room';

const router = Router();

// Home page
router.get('/', (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    res.redirect('/rooms');
  } else {
    res.json({
      login: {
        success: false,
        errors: req.error,
        showRegisterForm: req.showRegisterForm
      }
    });
  }
});

// Login
router.post('/login', authenticate('local', {
  successRedirect: '/rooms',
  failureRedirect: '/',
  failureFlash: true
}));

// Register via username and password
router.post('/register', (req: any, res: any, next: any) => {
  const credentials = { 'username': req.body.username, 'password': req.body.password };

  if (credentials.username === '' || credentials.password === '') {
    req.json({ error: 'Missing credentials.', showRegisterForm: true });
    res.redirect('/');
  } else {
    User.findOne({ 'username': new RegExp('^' + req.body.username + '$', 'i'), 'socialId': null }, (err: any, user: any) => {
      if (err) throw err;

      if (user) {
        req.json({ error: 'Username already exists.', showRegisterForm: true });
        res.redirect('/');
      } else {
        User.create(credentials, (err: any, newUser: any) => {
          if (err) throw err;

          req.json({ success: 'Your account has been created. Please log in.' });
          res.redirect('/');
        });
      }
    });
  }
});

// Social Authentication routes
// 1. Login via Facebook
router.get('/auth/facebook', authenticate('facebook'));
router.get('/auth/facebook/callback', authenticate('facebook', {
  successRedirect: '/rooms',
  failureRedirect: '/',
  failureFlash: true
}));

// Rooms
router.get('/rooms', [User.isAuthenticated, (req: any, res: any, next: any) => {
  Room.find(null, (err: any, rooms: any) => {
    if (err) throw err;

    res.json({ rooms });
  });
}]);

// Chat Room
router.get('/chat/:id', [User.isAuthenticated, (req: any, res: any, next: any) => {
  const roomId = req.params.id;

  Room.findById(roomId, (err: any, room: any) => {
    if (err) throw err;

    if (!room) return next();

    res.json({ chatroom: { user: req.user, room } });
  });
}]);

// Logout
router.get('/logout', (req: any, res: any, next: any) => {
  req.logout();

  req.session = null;

  res.redirect('/');
});

export default router;
