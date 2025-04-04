import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company, CompanySchema } from 'src/schemas/company.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Service } from 'src/services/s3.service';

@Module({
  imports : [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
  controllers: [CompanyController],
  providers: [CompanyService,S3Service],
})
export class CompanyModule {}
