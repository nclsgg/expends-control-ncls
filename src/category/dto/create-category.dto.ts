import { IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
  /**
   * Name of the category
   * @example 'Custo Fixo'
   */
  @IsString()
  @MaxLength(30)
  name: string;

  /**
   * Description of the category
   * @example 'Custos relacionados à sobrevivência'
   * @maxLength 255
   */
  @IsString()
  description: string;

  /**
   * Color of the category
   * @example '#000000'
   * @maxLength 7
   */
  @IsString()
  color: string;
}
