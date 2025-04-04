import { Inject, Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import Response from 'src/utils/response.builder';

@Injectable()
export class S3Service {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }


  async generateUploadUrl(fileName: string, contentType: string): Promise<any> {
    const key = `uploads/${uuidv4()}/${fileName}`;
    
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      ContentType: contentType,
    };
    console.log(params);
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 }); 
    console.log(url);
    return Response({presignUrl : url,key : key},200,'Success');
  }
}
