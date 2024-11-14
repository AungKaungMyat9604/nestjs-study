import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { SigninPayloadType, TokenPayloadType } from './auth.type';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CryptoJsService } from 'src/services/individual/crypto/crypto-js.service';
import { AppEnvValues } from 'src/resources/env/app.env';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private cryptoJsService: CryptoJsService,
  ) {
    console.log(this.cryptoJsService.randomHexString(32));
  }

  async signinUser(payload: SigninPayloadType, ip: string) {
    const user = await this.userService.findOne({
      where: {
        username: payload.username,
      },
    });

    const isPasswordCorrect = await compare(payload.password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Password is incorrect');
    }
    // generate access token
    const accessTokenPayload: TokenPayloadType = {
      tp: 0,
      uid: user.id,
      ip: ip,
    };
    const accessToken = sign(accessTokenPayload, AppEnvValues.JWT_SECRET_KEY, {
      expiresIn: AppEnvValues.ACCESS_TOKEN_EXP_SECOND,
    });

    // generate refresh token
    const refreshTokenPayload: TokenPayloadType = {
      tp: 1,
      uid: user.id,
      ip: ip,
    };
    const refreshToken = sign(
      refreshTokenPayload,
      AppEnvValues.JWT_SECRET_KEY,
      {
        expiresIn: AppEnvValues.REFRESH_TOKEN_EXP_SECOND,
      },
    );
    return { token: accessToken, refreshToken };
  }
}
