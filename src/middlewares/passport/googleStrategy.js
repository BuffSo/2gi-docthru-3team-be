import GoogleStrategy from 'passport-google-oauth20';

import userService from '../../services/userService.js';

const googleStrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3100/api/auth/google/callback'
};

// async function verify(accessToken, refreshToken, profile, done) {
//   const user = await userService.oauthCreateOrUpdate(
//     profile.provider,
//     profile.id,
//     profile.emails[0].value,
//     profile.displayName
//   );
//   done(null, user);
// }

async function verify(accessToken, refreshToken, profile, done) {
  try {
    const email = profile.emails[0].value;
    const user = await userService.oauthCreateOrUpdate(
      profile.provider,  // 'google'
      profile.id,       // Google 사용자 ID
      email,            // 이메일
      profile.displayName // 이름
    );

    // JWT 발급을 위해 사용자 데이터 반환
    const accessToken = userService.createToken(user, 'access');
    const refreshToken = userService.createToken(user, 'refresh');
    // const tokens = await userService.createToken(user.id);
    done(null, { ...user, accessToken, refreshToken });
  } catch (error) {
    done(error, false);
  }
}

const googleStrategy = new GoogleStrategy(googleStrategyOptions, verify);

export default googleStrategy;

