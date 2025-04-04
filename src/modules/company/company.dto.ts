import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, Matches, IsArray, ValidateNested, IsNumber } from "class-validator";
import { Message } from "src/utils/message.utils";

export class Address {
    @ApiProperty({ example: 'Sunflower Building' })
    street: string;
  
    @ApiProperty({ example: 'New York' })
    city: string;

    @ApiProperty({ example: '354770' })
    pincode: string;
  
    @ApiProperty({ example: 'USA' })
    country: string;

    @ApiProperty({ example: true })
    isHeadquater: boolean;
  }

export class Headquaters {
    
    @ApiProperty({ example: 'New York' })
    city: string;

    @ApiProperty({ example: 'USA' })
    country: string;
  }

export class ComapnyRegisterDTO {

    @ApiProperty({ example: 'OpenAI' })
    @IsString()
    @IsNotEmpty()
    name : string;

    @ApiProperty({ example: 'Working in AI based things' })
    @IsString()
    @IsNotEmpty()
    overview : string;

    @ApiProperty({ example: 'www.chatgpt.com' })
    @IsString()    
    websiteUrl : string;

    @ApiProperty({ example: ['IT'] })    
    industry : string[];

    // @ApiProperty({ example: [] }) 
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => Headquaters)   
    // headquater : Headquaters[];

    @ApiProperty({ example: "2024-02-02T11:00:12Z" })   
    founded : Date

    @ApiProperty({ type: [Address],
        example: [
            {
              street: '123 Main St',
              city: 'New York',
              pincode : '456789',
              country: 'USA',
              isHeadquater : true
            },
            {
              street: '456 High St',
              city: 'London',
              pincode : '456789',
              country: 'UK',
              isHeadquater : false
            },
          ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Address)
    addresses: Address[];

    @ApiProperty({ example: 150 })
    @IsNumber()    
    staffSize : number;

    @ApiProperty({example : 'chatgpt@gmail.com'})
    @IsString({ message: 'Email must be a string.' })
    @IsNotEmpty({ message: 'Email is required.' })
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: Message.EMAIL_VALID
    })
    email: string;
    
    @ApiProperty({example : 'Test@123'})
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
      message:Message.PASSWORD_MUST_BE_VALIDE,
    })
    password: string;
}
