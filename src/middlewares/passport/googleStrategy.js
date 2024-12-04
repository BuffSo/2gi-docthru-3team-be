import GoogleStrategy from 'passport-google-oauth20';
import userService from '../../services/userService.js';
import { validateUserData } from '../../../struct.js';

const googleStrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
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
    const nickname = profile.displayName;
    
    const validation = await validateUserData({ email, nickname }, 'google');
    
    if (validation.isDuplicate) {
      return done(null, false, { message: `이미 존재하는 ${validation.field}입니다.` });
    }
    
    const user = await userService.oauthCreateOrUpdate(
      profile.provider,  // 'google'
      profile.id,       // Google 사용자 ID
      email,            // 이메일
      nickname // 이름
    );

    // JWT 발급을 위해 사용자 데이터 반환
    const accessToken = userService.createToken(user, 'access');
    const refreshToken = userService.createToken(user, 'refresh');
    // const tokens = await userService.createToken(user.id);
    done(null, { ...user, accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return done(error, false);
  }
}

const googleStrategy = new GoogleStrategy(googleStrategyOptions, verify);

export default googleStrategy;

