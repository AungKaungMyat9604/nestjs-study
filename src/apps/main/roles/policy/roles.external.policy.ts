import {
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Role } from '../entities/role.entity';
import { CaslActionsEnum } from 'src/resources/enum/casl-actions.enum';
import { ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RequiredRulesType } from 'src/guards/policy/policy.type';

export type RolesSubjects = InferSubjects<typeof Role>;
export type RolesAbilityType = PureAbility<[CaslActionsEnum, RolesSubjects]>;

export function RolesExternalPolicyFactory(
  context: ExecutionContext,
  reflector: Reflector,
  logger: Logger,
) {
  //casl ability
  const { can, cannot, build } = new AbilityBuilder(
    PureAbility as AbilityClass<RolesAbilityType>,
  );

  const req: Request = context.switchToHttp().getRequest();
  const user = req.user;

  if (user?.isAdmin) {
    can(CaslActionsEnum.MANAGE, Role);
  } else {
    cannot(CaslActionsEnum.READ, Role).because('User is not admin');
  }

  return build();
}

export const ReadRolesRule: RequiredRulesType<CaslActionsEnum, RolesSubjects> =
  {
    action: CaslActionsEnum.READ,
    subject: Role,
  };

export const WriteRolesRule: RequiredRulesType<CaslActionsEnum, RolesSubjects> =
  {
    action: CaslActionsEnum.WRITE,
    subject: Role,
  };
