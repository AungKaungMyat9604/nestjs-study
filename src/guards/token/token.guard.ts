import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/apps/main/users/users.service';
import { TokenService } from 'src/services/gloabal/token/token.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    if (req.url.startsWith('/auth')) {
      return true;
    }

    //extract token
    const bearerToken = req.headers.authorization;
    const token = bearerToken.replace('Bearer ', '');

    //verify token
    const tokenPayload = this.tokenService.verifyAccessToken(token);

    //type
    if (tokenPayload.tp !== 0) {
      throw new NotAcceptableException('Invalid token type');
    }

    if (tokenPayload.ip !== req.ip) {
      throw new NotAcceptableException('Invalid token ip');
    }

    const user = await this.userService.findOne({
      where: { id: tokenPayload.uid },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    req.user = user;
    return true;
  }
}
