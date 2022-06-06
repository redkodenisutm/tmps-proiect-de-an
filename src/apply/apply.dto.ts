import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateApplyDto {
  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  cvId: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  contactPhone: string;
}
