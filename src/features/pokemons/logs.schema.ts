import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop()
  pokemon: string;

  @Prop()
  date: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
