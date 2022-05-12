import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonScheduler } from './pokemon.scheduler';
import { PokemonService } from './pokemon.service';
import { PokemonRepository } from './pokemon.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from '../log/log.module';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonRepository]), LogModule],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonScheduler],
})
export class PokemonModule {}
