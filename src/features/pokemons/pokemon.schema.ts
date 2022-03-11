import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {
  @Prop()
  name: string;

  @Prop()
  desactiveAt: Date;

  @Prop()
  isActual: boolean;

  @Prop()
  order: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
