import { ForbiddenError } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CryptoJsService } from 'src/services/individual/crypto/crypto-js.service';
import {
  EXTERNAL_POLICY_FACTORY,
  REQUIRED_RULE,
} from './decorator/policy.decorator';
import { PolicyFactoryType, RequiredRulesType } from './policy.type';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private cryptoJsService: CryptoJsService,
    private reflector: Reflector,
    private logger: Logger,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    //is router public
    if (req.isRouterPublic) {
      return true;
    }

    //is there user
    if (!req.user) {
      throw new UnauthorizedException('User not found');
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

    //rules
    const policyFactory = this.reflector.getAllAndOverride(
      EXTERNAL_POLICY_FACTORY,
      [context.getClass(), context.getHandler()],
    ) as PolicyFactoryType;

    if (policyFactory) {
      const ability = policyFactory(context, this.reflector, this.logger);
      const rules = this.reflector.get(
        REQUIRED_RULE,
        context.getHandler(),
      ) as RequiredRulesType<any, any, any>[];

      try {
        rules?.forEach((rule) => {
          ForbiddenError.from(ability).throwUnlessCan(
            rule.action,
            rule.subject,
            rule.fields,
          );

          //example
          // if (!ability.can(rule.action, rule.subject, rule.fields)) {
          //   throw new UnauthorizedException('You are not allowed');
          // }
        });
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException(error);
      }
    }

    return true;
  }
}
