import {
  DeepPartial,
  EntityRepository,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { Pokemon } from './pokemon.entity';

@EntityRepository(Pokemon)
export class PokemonRepository extends Repository<Pokemon> {
  async getPokemon(params: FindOneOptions<Pokemon>) {
    return this.findOne(params);
  }

  async createPokemon(dto: DeepPartial<Pokemon>) {
    const entity = this.create(dto);
    return this.save(entity);
  }

  async updatePokemon(dto: Pokemon) {
    return this.save(dto);
  }
}
