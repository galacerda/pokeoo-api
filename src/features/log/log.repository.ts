import { DeepPartial, EntityRepository, Repository } from 'typeorm';
import { Log } from './log.entity';

@EntityRepository(Log)
export class LogRepository extends Repository<Log> {
  async createLog(dto: DeepPartial<Log>) {
    const entity = this.create(dto);
    return this.save(entity);
  }
}
