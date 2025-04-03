import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


class Address {
  @Prop({ default: null })
  address: string;

  @Prop({ default: null })
  city: string;

  @Prop({ default: null })
  pincode: string;
}


@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name : string

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({type : [Address],default : [],})
  address : Address[];

}

export const UserSchema = SchemaFactory.createForClass(User);