import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { CreateCVDto, UpdateCVDto } from "./cv.dto";

@Injectable()
export class CVsService {
  constructor(private prisma: PrismaService) {}

  async cv(user: User, id: number) {
    const cv = await this.prisma.cV.findUnique({
      where: {
        id,
      },
    });

    if (!cv) {
      throw new HttpException("CV does not exist", HttpStatus.NOT_FOUND);
    }

    if (cv.userId !== user.id) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    return cv;
  }

  async CVs(user: User) {
    return this.prisma.cV.findMany({
      where: { userId: user.id },
    });
  }

  async createCV(user: User, cvDto: CreateCVDto) {
    return await this.prisma.cV.create({
      data: {
        ...cvDto,
        birthdate: new Date(cvDto.birthdate),
        aditional: cvDto.aditional || "",
        userId: user.id,
      },
    });
  }

  async updateCV(user: User, cvDto: UpdateCVDto) {
    const cv = await this.prisma.cV.findFirst({
      where: { id: cvDto.id },
    });

    if (!cv) {
      throw new HttpException("CV does not exist", HttpStatus.CONFLICT);
    }

    if (cv.userId !== user.id) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    return await this.prisma.cV.update({
      data: {
        ...cvDto,
        birthdate: new Date(cvDto.birthdate),
        aditional: cvDto.aditional || "",
      },
      where: { id: cvDto.id },
    });
  }

  async deleteCV(user: User, id: number) {
    const cv = await this.prisma.cV.findFirst({
      where: { id },
    });

    if (!cv) {
      throw new HttpException("CV does not exist", HttpStatus.CONFLICT);
    }

    if (cv.userId !== user.id) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    return this.prisma.cV.delete({
      where: {
        id,
      },
    });
  }
}
