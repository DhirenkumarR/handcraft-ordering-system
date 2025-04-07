import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ComapnyRegisterDTO } from './company.dto';
import { S3Service } from 'src/services/s3.service';
import { JwtAuthGuard } from 'src/authGuards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Company') 
@ApiBearerAuth() 
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly s3Service : S3Service
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('company-update')
  async register(
    @Body() body: ComapnyRegisterDTO,
  ) {
    return this.companyService.companyRegister(body);
  }


  @UseGuards(JwtAuthGuard)
  @Get('upload')
  async uploadOnS3(
    @Query('fileName') fileName : string,
    @Query('content') content : string,
    
  ) {
    return this.s3Service.generateUploadUrl(fileName,content);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getCompanyProfile(){
    return this.companyService.getCompanyProfile();
  }

}
