import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';

import { LogRepository } from './log.repository';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogRepository)
    private readonly logRepository: LogRepository,
  ) {}

  async createLog(pokemon: Pokemon) {
    const log = await this.logRepository.createLog({ pokemon });
    return log;
  }
}
