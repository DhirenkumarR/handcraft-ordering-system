import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company, CompanySchema } from 'src/schemas/company.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Service } from 'src/services/s3.service';
import { CompanyJobPost, JobPostSchema } from 'src/schemas/company_post.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }, { name: CompanyJobPost.name, schema: JobPostSchema },
  { name: User.name, schema: UserSchema }
  ])],
  controllers: [CompanyController],
  providers: [CompanyService, S3Service],
})
export class CompanyModule { }
