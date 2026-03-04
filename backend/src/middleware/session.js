import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

const sessionMiddleware = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 60 * 60, // 1 hour
      }),
      cookie: {
        maxAge: parseInt(process.env.SESSION_MAX_AGE) || 3600000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};

export default sessionMiddleware;
