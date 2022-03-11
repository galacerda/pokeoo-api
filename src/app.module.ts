import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './features/pokemons/pokemon.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://lacerda:19391945@mycluster-shard-00-00.0gx7b.mongodb.net:27017,mycluster-shard-00-01.0gx7b.mongodb.net:27017,mycluster-shard-00-02.0gx7b.mongodb.net:27017/pokeoo?replicaSet=atlas-y8l2u3-shard-0&ssl=true&authSource=admin',
    ),
    ScheduleModule.forRoot(),
    PokemonModule,
  ],
})
export class AppModule {}
