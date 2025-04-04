import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserType } from 'src/utils/constants';


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

  @Prop({ default : 'user', })
  roles: string;

  @Prop({ enum: [UserType.USER, UserType.COMPANY], default : UserType.USER })
  login_type : string

  @Prop({ default : null })
  contactNo : string
  
  @Prop({ default : 'user.jpg' })
  profileImage : string

  @Prop({ default : null })
  coverImage : string

}

export const UserSchema = SchemaFactory.createForClass(User);