import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './pokemon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonRepository } from './pokemon.repository';
import { LogService } from '../log/log.service';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonRepository)
    private readonly pokemonRepository: PokemonRepository,
    private readonly logService: LogService,
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

    const createdPokemons = await Promise.all(
      createPokemonsSerialized.map(async (pokemon) => {
        await this.pokemonRepository.createPokemon(pokemon);
      }),
    );

    return createdPokemons;
  }

  async generatePokemonOfTheDay() {
    const allPokemons = await this.pokemonRepository.find();

    const randomOrder = Math.floor(Math.random() * allPokemons.length - 1) + 1;

    const actualPokemon = await this.pokemonRepository.getPokemon({
      where: { isActual: 1 },
    });

    if (!actualPokemon) {
      throw new NotFoundException({
        field: 'isActual',
        error: 'not found actual pokemon',
      });
    }

    await this.pokemonRepository.updatePokemon({
      ...actualPokemon,
      isActual: false,
    });

    const sortedPokemon = await this.pokemonRepository.getPokemon({
      where: { order: randomOrder },
    });

    if (!sortedPokemon) {
      throw new NotFoundException({
        field: 'order',
        error: 'not found',
      });
    }

    await this.pokemonRepository.updatePokemon({
      ...sortedPokemon,
      isActual: true,
    });

    console.log(sortedPokemon.name);

    await this.logService.createLog(sortedPokemon);

    return sortedPokemon.name;
  }

  async getPokemonsOfTheDay() {
    const pokemon = await this.pokemonRepository.getPokemon({
      where: { isActual: true },
    });
    if (!pokemon) {
      throw new NotFoundException({
        field: 'pokemon',
        error: 'not found',
      });
    }
    return pokemon.name;
  }
}
