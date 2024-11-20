import { Logger, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './apps/main/auth/auth.module';
import { TokenPayloadType } from './apps/main/auth/auth.type';
import { RolesModule } from './apps/main/roles/roles.module';
import { TitlesModule } from './apps/main/titles/titles.module';
import { User } from './apps/main/users/entities/users.entity';
import { UserModule } from './apps/main/users/users.module';
import { BedsModule } from './apps/postgresql/beds/beds.module';
import { DepartmentsModule } from './apps/postgresql/departments/departments.module';
import { WardsModule } from './apps/postgresql/wards/wards.module';
import { SnacksModule } from './apps/secondary/snacks/snacks.module';
import { AppGuard } from './guards/app-guard/app-guard.guard';
import { AssignReqGuard } from './guards/assign-req/assign-req.guard';
import { PolicyGuard } from './guards/policy/policy.guard';
import { DatabaseEnum } from './resources/enum/database.enum';
import { AjvModule } from './services/gloabal/ajv/ajv.module';
import { TokenModule } from './services/gloabal/token/token.module';
import { CryptoJsModule } from './services/individual/crypto/crypto-js.module';
import { mainDatabaseConfig } from './services/individual/databases/main-database/main-database.config';
import { MainDatabaseModule } from './services/individual/databases/main-database/main-database.module';
import { PostgresqlDatabaseModule } from './services/individual/databases/postgresql-database/postgresql-database.module';
import { secondaryDatabaseConfig } from './services/individual/databases/secondary-database/secondary-database.config';
import { BackupDatabaseModule } from './services/individual/databases/secondary-database/secondary-database.module';

declare global {
  namespace Express {
    interface Request {
      user: User | null;
      isRouterPublic: boolean;
      isRouterAdmin: boolean;
      tokenPayload: TokenPayloadType;
    }
  }
}
@Module({
  imports: [
    // TypeORM Modules
    TypeOrmModule.forRoot(mainDatabaseConfig),
    TypeOrmModule.forRootAsync({
      name: DatabaseEnum.SECONDARY,
      useFactory: () => secondaryDatabaseConfig,
    }),
    // TypeOrmModule.forRoot(postgresqlDatabaseConfig),

    //App Modules
    AjvModule,
    AuthModule,
    BackupDatabaseModule,
    BedsModule,
    CryptoJsModule,
    DepartmentsModule,
    MainDatabaseModule,
    PostgresqlDatabaseModule,
    RolesModule,
    SnacksModule,
    TitlesModule,
    TokenModule,
    UserModule,
    WardsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AssignReqGuard,
    PolicyGuard,
    Logger,

    { provide: APP_GUARD, useClass: AppGuard },
  ],
})
export class AppModule {}
