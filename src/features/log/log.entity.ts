import { BaseEntity } from 'src/base/base.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';

@Entity()
export class Log extends BaseEntity {
  @ManyToOne(() => Pokemon, (pokemon) => pokemon.logs)
  pokemon: Pokemon;
}
