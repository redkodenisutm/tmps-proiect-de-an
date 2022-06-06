import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../user/user.decorator";
import { CreateCVDto, UpdateCVDto } from "./cv.dto";
import { CVsService } from "./cv.service";

@Controller("cvs")
export class CVsController {
  constructor(private readonly cvsService: CVsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCVs(@CurrentUser() user: User) {
    return this.cvsService.CVs(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":cvId")
  async getCV(@CurrentUser() user: User, @Param("cvId") cvId: number) {
    return this.cvsService.cv(user, +cvId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCV(@CurrentUser() user: User, @Body() data: CreateCVDto) {
    return this.cvsService.createCV(user, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateCV(@CurrentUser() user: User, @Body() data: UpdateCVDto) {
    return this.cvsService.updateCV(user, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":cvId")
  async deleteCV(@CurrentUser() user: User, @Param("cvId") cvId: number) {
    return this.cvsService.deleteCV(user, +cvId);
  }
}
