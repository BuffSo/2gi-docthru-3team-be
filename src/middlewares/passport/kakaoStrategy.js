import { Strategy as KakaoStrategy } from 'passport-kakao';
import userService from '../../services/userService.js';
import { validateUserData } from '../../../struct.js';

const kakaoStrategyOptions = {
  clientID: process.env.KAKAO_CLIENT_ID,
  clientSecret: process.env.KAKAO_CLIENT_SECRET,
  callbackURL: process.env.KAKAO_CALLBACK_URL,
};

async function verify(accessToken, refreshToken, profile, done) {
  try {
    const { id, _json } = profile;
    const email = _json.kakao_account?.email;
    const nickname = profile.displayName;

    const validation = await validateUserData({ email, nickname }, 'kakao');
    
    if (validation.isDuplicate) {
      return done(null, false, { message: `이미 존재하는 ${validation.field}입니다.` });
    }

    const user = await userService.oauthCreateOrUpdate(
      profile.provider,         // provider
      String(profile.id),       // Kakao 사용자 ID
      email,                    // 이메일
      nickname,                 // 이름
    );

    // JWT 발급을 위해 사용자 데이터 반환
    const accessToken = userService.createToken(user, 'access');
    const refreshToken = userService.createToken(user, 'refresh');
    done(null, { ...user, accessToken, refreshToken });
  } catch (error) {
    done(error, false);
  }
}

const kakaoStrategy = new KakaoStrategy(kakaoStrategyOptions, verify);

export default kakaoStrategy;

