import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Log } from '../log/log.entity';

@Entity()
export class Pokemon extends BaseEntity {
  @Column()
  name: string;

  @Column()
  isActual: boolean;

  @Column()
  order: number;

  @OneToMany(() => Log, (log) => log.pokemon)
  logs: Log[];
}
