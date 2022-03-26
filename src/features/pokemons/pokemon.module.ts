import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './logs.schema';
import { PokemonController } from './pokemon.controller';
import { PokemonScheduler } from './pokemon.scheduler';
import { Pokemon, PokemonSchema } from './pokemon.schema';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonScheduler],
})
export class PokemonModule {}
