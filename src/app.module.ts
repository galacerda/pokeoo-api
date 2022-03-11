import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './features/pokemons/pokemon.module';
import { ScheduleModule } from '@nestjs/schedule';

const mongoDbUri = 'aa';

@Module({
  imports: [
    MongooseModule.forRoot(mongoDbUri),
    ScheduleModule.forRoot(),
    PokemonModule,
  ],
})
export class AppModule {}
