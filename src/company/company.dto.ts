import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsString()
  website: string;

  @IsNotEmpty()
  @IsString()
  supportEmail: string;

  @IsString()
  supportPhone: string;
}

export class UpdateCompanyDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  supportEmail: string;

  @IsString()
  @IsOptional()
  supportPhone: string;
}
