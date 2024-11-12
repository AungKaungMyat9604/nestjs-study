import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainDatabaseModule } from './services/individual/databases/main-database/main-database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './apps/main/users/users.module';
import { BackupDatabaseModule } from './services/individual/databases/secondary-database/secondary-database.module';
import { SnacksModule } from './apps/secondary/snacks/snacks.module';
import { TitlesModule } from './apps/main/titles/titles.module';
import { RolesModule } from './apps/main/roles/roles.module';
import { PostgresqlDatabaseModule } from './services/individual/databases/postgresql-database/postgresql-database.module';
import { postgresqlDatabaseConfig } from './services/individual/databases/postgresql-database/postgresql-database.config';
import { DepartmentsModule } from './apps/postgresql/departments/departments.module';
import { BedsModule } from './apps/postgresql/beds/beds.module';
import { WardsModule } from './apps/postgresql/wards/wards.module';
import { AjvModule } from './services/gloabal/ajv/ajv.module';
import { mainDatabaseConfig } from './services/individual/databases/main-database/main-database.config';
import { secondaryDatabaseConfig } from './services/individual/databases/secondary-database/secondary-database.config';
import { DatabaseEnum } from './resources/enum/database.enum';

@Module({
  imports: [
    //TypeORM Modules
    TypeOrmModule.forRoot(mainDatabaseConfig),
    TypeOrmModule.forRootAsync({
      name: DatabaseEnum.SECONDARY,
      useFactory: () => secondaryDatabaseConfig,
    }),
    // TypeOrmModule.forRoot(postgresqlDatabaseConfig),

    //App Modules
    TitlesModule,
    MainDatabaseModule,
    UserModule,
    BackupDatabaseModule,
    SnacksModule,
    RolesModule,
    DepartmentsModule,
    PostgresqlDatabaseModule,
    BedsModule,
    WardsModule,
    AjvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
