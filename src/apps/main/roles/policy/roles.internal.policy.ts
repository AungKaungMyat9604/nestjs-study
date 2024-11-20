import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/users.entity';
import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';
import { RolesAbilityType } from './roles.external.policy';
import { CaslActionsEnum } from 'src/resources/enum/casl-actions.enum';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesInternalPolicy {
  constructor() {}

  //ip
  //user

  definePolicy(user: User, obj: any) {
    const ability = new AbilityBuilder(
      PureAbility as AbilityClass<RolesAbilityType>,
    );

    if (user?.isAdmin) {
      ability.can(CaslActionsEnum.MANAGE, Role);
    } else {
      if (obj.name?.startsWith('PHH')) {
        ability.can(CaslActionsEnum.WRITE, Role);
      } else {
        ability
          .cannot(CaslActionsEnum.WRITE, Role)
          .because(
            'User is not admin and can only create role name start with PHH',
          );
      }
    }

    return ability.build();
  }
}
