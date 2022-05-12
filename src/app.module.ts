import { Module } from '@nestjs/common';
import { PokemonModule } from './features/pokemon/pokemon.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PokemonModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
