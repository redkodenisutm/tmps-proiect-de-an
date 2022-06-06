import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";
import { CategoriesService } from "./categories.service";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoryService.categories();
  }

  @Get(":categoryId")
  async getCategory(@Param("categoryId") categoryId: number) {
    return this.categoryService.category(+categoryId);
  }

  @Post()
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.categoryService.createCategory(data);
  }

  @Put()
  async updateCategory(@Body() data: UpdateCategoryDto) {
    return this.categoryService.updateCategory(data);
  }

  @Delete(":categoryId")
  async deleteCategory(@Param("categoryId") categoryId: number) {
    return this.categoryService.deleteCategory(+categoryId);
  }
}
