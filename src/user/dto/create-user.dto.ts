import { IsEmail, MinLength, MaxLength, Matches, IsString, IsOptional } from "class-validator";

export class CreateUserDto {
  /**
   * Email used to login to the application
   * @example 'email@email.com'
   * @format email
   * @minLength 6
   * @maxLength 320
   * @pattern ^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$
   * @default 'email'
   * @unique
   * @required
   */
  @IsEmail()
  email: string;

  /**
   * Password used to login to the application
   * @example 'password'
   * @minLength 8
   * @maxLength 20
   * @pattern /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
   * @format password
   * @default 'password'
   * @required
   */
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  /**
   * Name of the user
   * @example 'John Doe'
   * @minLength 2
   * @maxLength 255
   * @default 'John Doe'
   */

  @IsString()
  @IsOptional()
  name?: string;
}
