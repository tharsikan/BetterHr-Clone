
# BetterHR Backend Authentication Logic

## 1. Routes Structure (Express/Node)

```javascript
// POST /auth/login
// POST /auth/register
// GET /auth/google
// GET /auth/google/callback
```

### The "First-Time Social" Logic
In your `passport.js` strategy or callback:

```javascript
async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ email: profile.emails[0].value });
  
  if (!user) {
    // Create skeleton user
    user = await User.create({
      email: profile.emails[0].value,
      status: 'PENDING_ONBOARDING', // Custom state
      oauth_provider: 'google'
    });
    return done(null, user, { onboard: true }); 
  }
  
  return done(null, user);
}
```

## 2. Authorization Middleware (isAuthorized)

```javascript
const jwt = require('jsonwebtoken');

const isAuthorized = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Multi-tenant check
    if (decoded.status !== 'ACTIVE') {
      return res.status(403).json({ error: "Account not active or pending approval" });
    }

    req.user = decoded; // Contains uid, cid, role
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid session" });
  }
};
```
