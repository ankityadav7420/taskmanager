// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/UserModel");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback"
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if the user already exists in the database
//         let user = await User.findOne({ email: profile.emails[0].value });

//         if (!user) {
//           // Create a new user if doesn't exist
//           user = new User({
//             firstname: profile.name.givenName,
//             lastname: profile.name.familyName,
//             email: profile.emails[0].value,
//             password: "" // No password since it's Google auth
//           });

//           await user.save();
//         }

//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/userModel");
// console.log("clientID GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback"
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if the user already exists
//         let user = await User.findOne({ email: profile.emails[0].value });
//         if (!user) {
//           // Create a new user if one doesn't exist
//           user = new User({
//             firstname: profile.name.givenName,
//             lastname: profile.name.familyName,
//             email: profile.emails[0].value,
//             password: "" // Leave password empty for Google users
//           });
//           await user.save();
//         }
//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });
