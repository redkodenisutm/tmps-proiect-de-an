import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOfferDto {
  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @IsNotEmpty()
  @IsInt()
  companyId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsString()
  education: string;

  @IsString()
  experience: string;

  @IsNumber()
  salary: number;

  @IsString()
  workSchedule: string;
}
