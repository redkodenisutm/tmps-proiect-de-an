import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async category(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async categories(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    } = {},
  ) {
    return this.prisma.category.findMany({
      ...params,
    });
  }

  async createCategory(categoryDto: CreateCategoryDto) {
    const categoryInDb = await this.prisma.category.findFirst({
      where: { name: categoryDto.name },
    });

    if (categoryInDb) {
      throw new HttpException(
        "Categoria cu asa nume exista",
        HttpStatus.CONFLICT,
      );
    }

    return await this.prisma.category.create({
      data: {
        ...categoryDto,
      },
    });
  }

  async updateCategory(data: UpdateCategoryDto) {
    const categoryInDb = await this.prisma.category.findFirst({
      where: { name: data.name },
    });

    if (categoryInDb) {
      throw new HttpException(
        "Categoria cu asa nume exista",
        HttpStatus.CONFLICT,
      );
    }

    return this.prisma.category.update({
      data: { name: data.name },
      where: {
        id: +data.id,
      },
    });
  }

  async deleteCategory(id: number) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
