import { IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
  /**
   * Name of the category
   * @example 'Custo Fixo'
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * Description of the category
   * @example 'Custos relacionados à sobrevivência'
   * @maxLength 255
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * Color of the category
   * @example '#000000'
   * @maxLength 7
   */
  @IsString()
  @IsOptional()
  color?: string;

}
