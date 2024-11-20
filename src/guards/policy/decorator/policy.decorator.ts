import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { PolicyFactoryType, RequiredRulesType } from '../policy.type';

export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY';
export const ARE_PUBLIC_KEY = 'ARE_PUBLIC_KEY';

export const IS_ADMIN = 'IS_ADMIN';
export const ARE_ADMIN = 'ARE_ADMIN';

export const CurrentUser = createParamDecorator(
  (key: any, context: ExecutionContext) => {
    console.log(key);
    const req = context.switchToHttp().getRequest();
    return key ? req.user[key] : req.user;
  },
);

export const IsPublic = () => SetMetadata<string, boolean>(IS_PUBLIC_KEY, true);

export const ArePublic = () =>
  SetMetadata<string, boolean>(ARE_PUBLIC_KEY, true);

export const IsAdmin = () => SetMetadata<string, boolean>(IS_ADMIN, true);

export const AreAdmin = () => SetMetadata<string, boolean>(ARE_ADMIN, true);
//register external policy
export const EXTERNAL_POLICY_FACTORY = 'EXTERNAL_POLICY_FACTORY';
export const REQUIRED_RULE = 'REQUIRED_RULE';
export const RegisterExternalPolicy = (policyFactory: PolicyFactoryType) =>
  SetMetadata(EXTERNAL_POLICY_FACTORY, policyFactory);
export const RegisterRule = <A, S, F = string[]>(
  ...requiredRules: RequiredRulesType<A, S, F>[]
) => SetMetadata(REQUIRED_RULE, requiredRules);
