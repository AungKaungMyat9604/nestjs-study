import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/apps/main/users/users.service';
import { TokenService } from 'src/services/gloabal/token/token.service';
import {
  ARE_ADMIN,
  ARE_PUBLIC_KEY,
  IS_ADMIN,
  IS_PUBLIC_KEY,
} from '../policy/decorator/policy.decorator';
import { Request } from 'express';

@Injectable()
export class AssignReqGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    //assign policy decorator
    try {
      //is admin
      const isAdmin =
        this.reflector.get(IS_ADMIN, context.getHandler()) ?? false;

      //are admin
      const areAdmin =
        this.reflector.getAllAndOverride(ARE_ADMIN, [
          context.getClass(),
          context.getHandler(),
        ]) ?? false;

      req.isRouterAdmin = isAdmin || areAdmin;
    } catch (error) {}

    //assign policy decorator
    try {
      //is public
      const isPublic =
        this.reflector.get(IS_PUBLIC_KEY, context.getHandler()) ?? false;

      //are public
      const arePublic =
        this.reflector.getAllAndOverride(ARE_PUBLIC_KEY, [
          context.getClass(),
          context.getHandler(),
        ]) ?? false;

      req.isRouterPublic = isPublic || arePublic;
    } catch (error) {}

    //assign policy decorators
    try {
      //extract token
      const bearerToken = req.headers.authorization;
      const token = bearerToken.replace('Bearer ', '') ?? '';
      //verify token
      const tokenPayload = this.tokenService.verifyAccessToken(token);
      req.tokenPayload = tokenPayload;

      const user = await this.userService.findOne({
        where: { id: tokenPayload.uid },
      });

      //assign user to req
      req.user = user;
    } catch (error) {
      console.log(error);
    }

    //this guard assigns user to req
    //always return true
    return true;
  }
}
