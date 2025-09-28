// auth/passport.js
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

function configurePassport() {
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET || !process.env.GITHUB_CALLBACK_URL) {
    throw new Error('Missing GitHub OAuth env vars');
  }

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      (accessToken, _refreshToken, profile, done) => {
        // Store only what you need in the session
        const user = {
          id: profile.id,
          username: profile.username,
          displayName: profile.displayName,
        };
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  return passport;
}

module.exports = configurePassport;
