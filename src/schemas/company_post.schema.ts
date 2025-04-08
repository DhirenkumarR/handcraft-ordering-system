import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Company } from './company.schema';

class Address {
  @Prop({ default: null })
  address: string;

  @Prop({ default: null })
  city: string;

  @Prop({ default: null })
  pincode: string;

  @Prop({ default: null })
  country: string;

  @Prop({ default: true })
  isHeadquarter: boolean;
}

@Schema({ timestamps: true })
export class CompanyJobPost extends Document {

  @Prop({ type: Types.ObjectId, ref: Company.name, required: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  jobTitle: string

  @Prop({ required: true })
  jobType: string

  @Prop({ required: true })
  jobCategory: string[]

  @Prop({ required: true })
  minExperience: number

  @Prop({ required: true })
  maxExperience: number

  @Prop({ default: [] })
  degree: string[];

  @Prop({ default: null })
  minSalary: number;

  @Prop({ default: null })
  maxSalary: number;

  @Prop({ default: null })
  salaryType: string;

  @Prop({ default: null })
  currency: string;

  @Prop({ default: [] })
  city: [];

  @Prop({ default: [] })
  country: [];

  @Prop({ default: null })
  jobDescription: string

  @Prop({ default: [] })
  keyResponsibility: string[]

  @Prop({ default: [] })
  professionalSkills: string[]

  @Prop({ default: [] })
  tags: string[]

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ required: true })
  contactNo: string[];

  @Prop({ default: null })
  totalPositions: number;

  @Prop({ default: null })
  occupiedPositions: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [Address], default: [], })
  addresses: Address[];

}

export const JobPostSchema = SchemaFactory.createForClass(CompanyJobPost);