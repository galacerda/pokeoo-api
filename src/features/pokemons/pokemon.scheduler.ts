import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PokemonService } from './pokemon.service';

@Injectable()
export class PokemonScheduler {
  private readonly logger = new Logger(PokemonScheduler.name);

  constructor(private readonly pokemonService: PokemonService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.log('Get pokemon of the day initialized');

    const pokemon = await this.pokemonService.generatePokemonOfTheDay();

    this.logger.log(`Pokemon of the day is ${pokemon}`);

    this.logger.log('Get pokemon of the day finished');
  }
}
