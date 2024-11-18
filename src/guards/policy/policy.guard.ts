import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CryptoJsService } from 'src/services/individual/crypto/crypto-js.service';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private cryptoJsService: CryptoJsService) {}
  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    //is router public
    if (req.isRouterPublic) {
      return true;
    }

    //check user
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }

    //is user valid
    if (!req.user?.active) {
      throw new UnauthorizedException('User is not active');
    }

    //is user acc locked
    if (req.user?.isLocked) {
      throw new UnauthorizedException('User is locked');
    }

    // is ip matched
    if (req.ip !== req.tokenPayload.ip) {
      throw new UnauthorizedException(`IP not matched`);
    }

    // user agent
    if (
      this.cryptoJsService.hexString(req.headers['user-agent']) !==
      req.tokenPayload.usa
    ) {
      throw new UnauthorizedException(`User agent not matched`);
    }

    //is router admin
    if (req.isRouterAdmin) {
      if (req.user?.isAdmin) {
        return true;
      } else {
        throw new UnauthorizedException('User is not authorized as an admin');
      }
    }

    return true;
  }
}
