import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, PokemonDocument } from './pokemon.schema';
import { CreatePokemonDto } from './pokemon.dto';
import { Log, LogDocument } from './logs.schema';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
    @InjectModel(Log.name) private logModel: Model<LogDocument>,
  ) {}

  async createPokemons(createPokemonsDto: CreatePokemonDto[]) {
    console.log(process.env.MONGODB_URI);
    const createPokemonsSerialized = createPokemonsDto.map(
      (createPokemon, index) => ({
        ...createPokemon,
        desactiveAt: null,
        isActual: false,
        order: index,
      }),
    );

    const createdPokemons = await this.pokemonModel.insertMany(
      createPokemonsSerialized,
    );

    return createdPokemons;
  }

  async generatePokemonOfTheDay() {
    const randomOrder = Math.floor(Math.random() * 242) + 1;

    await this.pokemonModel.updateOne(
      { isActual: true },
      { isActual: false, desactiveAt: new Date() },
    );

    const { order, name } = await this.getPokemonByOrder(randomOrder);

    await this.pokemonModel.updateOne({ order }, { isActual: true });
    const createdLog = new this.logModel({ pokemon: name, date: new Date() });
    createdLog.save();

    return name;
  }

  async getPokemonByOrder(order: number) {
    return this.pokemonModel.findOne({ order, desactiveAt: null });
  }

  async getPokemonsOfTheDay() {
    const pokemon = await this.pokemonModel.findOne({ isActual: true });
    if (!pokemon) {
      throw new NotFoundException({
        field: 'pokemon',
        error: 'not found',
      });
    }
    return pokemon.name;
  }
}
