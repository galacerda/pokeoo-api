import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'lacerda',
  password: 'lacerda123',
  database: 'pokeo',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  migrationsRun: false,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default typeOrmConfig;
