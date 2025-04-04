import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


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
  @Prop({ required: true })
  companyName : string

  @Prop({ required: true })
  city: [];

  @Prop({ required: true })
  country: [];

  @Prop({ required: true })
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

  @Prop({default : null})
  profile : string;

  @Prop({default : null})
  coverProfile : string;

  @Prop({default : false})
  isDeleted : boolean;

  @Prop({required : true})
  email : string;

  @Prop({required : true})
  password : string;

}

export const CompanySchema = SchemaFactory.createForClass(Company);