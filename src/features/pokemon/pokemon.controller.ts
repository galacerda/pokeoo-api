import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePokemonDto } from './pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Post()
  createPokemons(@Body() createPokemonsDto: CreatePokemonDto[]) {
    return this.pokemonService.createPokemons(createPokemonsDto);
  }

  @Get()
  getPokemonOfTheDay() {
    return this.pokemonService.getPokemonsOfTheDay();
  }

  @Get('/generate')
  generatePokemon() {
    return this.pokemonService.generatePokemonOfTheDay();
  }
}
