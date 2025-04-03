import { IsNotEmpty, IsString, Matches } from "class-validator";
import { Message } from "src/utils/message.utils";

export class SignUpDTO {
    @IsString()
    @IsNotEmpty()
    email : string;
    
    @IsString()
    @IsNotEmpty()
    name : string;

    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
      message:Message.PASSWORD_MUST_BE_VALIDE,
    })
    password: string;
}

