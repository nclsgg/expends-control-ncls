import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateExpenseDto {

  /**
   * Value of the expense
   * @example 1000
   * @minimum 0
   * @default 100
   */
  @IsNumber()
  value: number;

  /**
   * Title of the expense
   * @example 'Aluguel'
   * @maxLength 255
   * @default 'Aluguel'
   */
  @IsString()
  title: string;

  /**
   * Start date of the expense
   * @example '2021-01-01'
   * @format date
   * @default '2021-01-01'
   */
  @IsString()
  startDate: string;

  /**
   * End date of the expense
   * @example '2021-01-31'
   * @format date
   * @default '2021-01-31'
   */
  @IsString()
  endDate: string;

  @IsString()
  categoryName: string;
}
