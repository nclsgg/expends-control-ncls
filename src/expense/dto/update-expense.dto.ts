import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateExpenseDto {

  /**
   * Value of the expense
   * @example 1000
   * @minimum 0
   * @default 100
   */
  @IsNumber()
  @IsOptional()
  value?: number;
  
  /**
   * Title of the expense
   * @example 'Aluguel'
   * @maxLength 255
   * @default 'Aluguel'
   */
  @IsString()
  @IsOptional()
  title?: string;

  /**
   * Start date of the expense
   * @example '2021-01-01'
   * @format date
   * @default '2021-01-01'
   */
  @IsDate()
  @IsOptional()
  startDate?: Date;

  /**
   * End date of the expense
   * @example '2021-01-31'
   * @format date
   * @default '2021-01-31'
   */
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  categoryName?: string;

}
