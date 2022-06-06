import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export enum SexEnum {
  MALE = "m",
  FEMALE = "f",
}

export class CreateCVDto {
  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  birthdate: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsBoolean()
  @IsOptional()
  canDisclocate: boolean;

  @IsNotEmpty()
  @IsEnum(SexEnum)
  sex: SexEnum;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsString()
  education: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  aditional: string;
}

export class UpdateCVDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsOptional()
  birthdate: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  city: string;

  @IsBoolean()
  @IsOptional()
  canDisclocate: boolean;

  @IsNotEmpty()
  @IsEnum(SexEnum)
  @IsOptional()
  sex: SexEnum;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  experience: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  education: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  aditional: string;
}
