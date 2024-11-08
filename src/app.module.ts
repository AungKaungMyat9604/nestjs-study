import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainDatabaseModule } from './services/databases/main-database/main-database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './apps/main/users/users.module';
import { BackupDatabaseModule } from './services/databases/secondary-database/secondary-database.module';
import { SnacksModule } from './apps/secondary/snacks/snacks.module';
import { TitlesModule } from './apps/main/titles/titles.module';
import { RolesModule } from './apps/main/roles/roles.module';
import { PostgresqlDatabaseModule } from './services/databases/postgresql-database/postgresql-database.module';
import { postgresqlDatabaseConfig } from './services/databases/postgresql-database/postgresql-database.config';
import { DepartmentsModule } from './apps/postgresql/departments/departments.module';
import { BedsModule } from './apps/postgresql/beds/beds.module';
import { WardsModule } from './apps/postgresql/wards/wards.module';

@Module({
  imports: [
    // //TypeORM Modules
    // TypeOrmModule.forRoot(mainDatabaseConfig),
    // TypeOrmModule.forRootAsync({
    //   name: DatabaseEnum.SECONDARY,
    //   useFactory: () => secondaryDatabaseConfig,
    // }),
    TypeOrmModule.forRoot(postgresqlDatabaseConfig),

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
