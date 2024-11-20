import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  CurrentUser,
  IsPublic,
  RegisterExternalPolicy,
  RegisterRule,
} from 'src/guards/policy/decorator/policy.decorator';
import {
  ReadRolesRule,
  RolesExternalPolicyFactory,
  WriteRolesRule,
} from './policy/roles.external.policy';
import { RolesInternalPolicy } from './policy/roles.internal.policy';
import { User } from '../users/entities/users.entity';
import { CaslActionsEnum } from 'src/resources/enum/casl-actions.enum';
import { Role } from './entities/role.entity';
import { ForbiddenError } from '@casl/ability';

@Controller('roles')
// @RegisterExternalPolicy(RolesExternalPolicyFactory)
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private rolesInternalPolicy: RolesInternalPolicy,
  ) {}

  @Post()
  @RegisterRule(WriteRolesRule)
  create(@Body() createRoleDto: CreateRoleDto, @CurrentUser() user: User) {
    const ability = this.rolesInternalPolicy.definePolicy(user, createRoleDto);

    try {
      ForbiddenError.from(ability).throwUnlessCan(CaslActionsEnum.WRITE, Role);
      return this.rolesService.create(createRoleDto);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  @Get('all')
  // @IsPublic()
  @RegisterRule(ReadRolesRule)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne({ where: { id: +id } });
  }

  @Patch(':id')
  @RegisterRule(WriteRolesRule)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update({ where: { id: +id } }, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove({ where: { id: +id } });
  }
}
