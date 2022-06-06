import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}
