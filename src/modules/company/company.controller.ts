import { Body, Controller, Get, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ComapnyRegisterDTO } from './dto/company.dto';
import { S3Service } from 'src/services/s3.service';
import { JwtAuthGuard } from 'src/authGuards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostJobDTO } from './dto/createPost.dto';

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

  @UseGuards(JwtAuthGuard)
  @Post('create-job-post')
  async jobPost(@Body() body:PostJobDTO){
    return this.companyService.jobPost(body);
  }


  @UseGuards(JwtAuthGuard)
  @Get('get-job-post-by-company')
  async getJobPostByCompany(
    @Query('companyId') comapnyId:string,
    @Query('page',ParseIntPipe) page:number,
    @Query('limit',ParseIntPipe) limit:number,
  ){
    return this.companyService.getJobByCompany(comapnyId,page,limit);
  }



}
