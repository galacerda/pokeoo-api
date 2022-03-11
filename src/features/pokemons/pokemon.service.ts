import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, PokemonDocument } from './pokemon.schema';
import { CreatePokemonDto } from './pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
  ) {}

  async createPokemons(createPokemonsDto: CreatePokemonDto[]) {
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

    return name;
  }

  async getPokemonByOrder(order: number) {
    return this.pokemonModel.findOne({ order, desactiveAt: null });
  }

  async getPokemonsOfTheDay() {
    const { name } = await this.pokemonModel.findOne({ isActual: true });

    return name;
  }
}
