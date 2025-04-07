import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';


class Address {
  @Prop({ default: null })
  address: string;

  @Prop({ default: null })
  city: string;

  @Prop({ default: null })
  pincode: string;

  @Prop({ default: null })
  country: string;

  @Prop({ default : true })
  isHeadquarter: boolean;
}


class Headquaters {

  @Prop({ default: null })
  city: string;

  @Prop({ default: null })
  country: string;

}

@Schema({ timestamps: true })
export class Company extends Document {

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  companyName : string

  @Prop({ default : [] })
  city: [];

  @Prop({ default : [] })
  country: [];

  @Prop({ default: null })
  staffSize: string

  @Prop({ default : null })
  overview: string

  @Prop({ default : null })
  websiteUrl: string

  @Prop({ default : [] })
  industryType : string[]

  @Prop({ default : [] })
  headquarters : Headquaters[]

  @Prop({ default : null })
  founded : Date

  @Prop({type : [Address],default : [],})
  addresses : Address[];

  @Prop({default : 'office.jpg'})
  profile : string;

  @Prop({default : null})
  coverProfile : string;

  @Prop({default : false})
  isDeleted : boolean;

  @Prop({required : true})
  contactNo : string[];

}

export const CompanySchema = SchemaFactory.createForClass(Company);