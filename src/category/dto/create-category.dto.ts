import { IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {

  @IsString()
  @MaxLength(30)
  name: string;

  @IsString()
  description: string;

  @IsString()
  color: string;
}
