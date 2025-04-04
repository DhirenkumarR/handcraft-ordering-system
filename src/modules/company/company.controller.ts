import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ComapnyRegisterDTO } from './company.dto';
import { S3Service } from 'src/services/s3.service';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly s3Service : S3Service
  ) { }

  @Post('register-company')
  async register(
    @Body() body: ComapnyRegisterDTO,
  ) {
    return this.companyService.companyRegister(body);
  }


  @Get('upload')
  async uploadOnS3(
    @Query('fileName') fileName : string,
    @Query('content') content : string,
    
  ) {
    return this.s3Service.generateUploadUrl(fileName,content);
  }

}
