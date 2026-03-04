import passport from 'passport';

// Google Login
export const googleLogin = (req, res, next) => {
  console.log('\n=== GOOGLE LOGIN INITIATED ===');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

export const googleCallback = (req, res, next) => {
  console.log('\n=== GOOGLE CALLBACK ===');
  console.log('Query params:', req.query);
  console.log('Session ID:', req.sessionID);
  
  passport.authenticate(
    'google',
    {
      successRedirect: `${process.env.CLIENT_URL}/dashboard`,
      failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
    },
    (err, user, info) => {
      console.log('Auth result:', { err: err?.message, user: user?.email, info });
      
      if (err) {
        console.error('Auth error:', err);
        return res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
      }
      if (!user) {
        console.error('No user returned from OAuth');
        return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Login error:', err);
          return res.redirect(`${process.env.CLIENT_URL}/login?error=session_error`);
        }
        console.log('User logged in successfully:', user.email);
        return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
      });
    }
  )(req, res, next);
};

// GitHub Login
export const githubLogin = (req, res, next) => {
  console.log('\n=== GITHUB LOGIN INITIATED ===');
  passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
};

export const githubCallback = (req, res, next) => {
  console.log('\n=== GITHUB CALLBACK ===');
  console.log('Query params:', req.query);
  console.log('Session ID:', req.sessionID);
  
  passport.authenticate(
    'github',
    {
      successRedirect: `${process.env.CLIENT_URL}/dashboard`,
      failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
    },
    (err, user, info) => {
      console.log('Auth result:', { err: err?.message, user: user?.email, info });
      
      if (err) {
        console.error('Auth error:', err);
        return res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
      }
      if (!user) {
        console.error('No user returned from OAuth');
        return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Login error:', err);
          return res.redirect(`${process.env.CLIENT_URL}/login?error=session_error`);
        }
        console.log('User logged in successfully:', user.email);
        return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
      });
    }
  )(req, res, next);
};

export const logout = (req, res) => {
  console.log('\n=== LOGOUT ===');
  console.log('User logging out:', req.user?.email);
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error destroying session' });
      }
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
};

export const getCurrentUser = (req, res) => {
  console.log('\n=== GET CURRENT USER ===');
  console.log('Session ID:', req.sessionID);
  console.log('Is authenticated:', req.isAuthenticated());
  console.log('User:', req.user);
  
  if (req.isAuthenticated()) {
    const user = req.user;
    const userData = {
      id: user._id,
      githubId: user.githubId,
      googleId: user.googleId,
      displayName: user.displayName,
      email: user.email,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
    };
    res.json({ isAuthenticated: true, user: userData });
  } else {
    res.json({ isAuthenticated: false, user: null });
  }
};

export const checkAuth = (req, res) => {
  console.log('\n=== CHECK AUTH ===');
  console.log('Session ID:', req.sessionID);
  console.log('Is authenticated:', req.isAuthenticated());
  
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
};
