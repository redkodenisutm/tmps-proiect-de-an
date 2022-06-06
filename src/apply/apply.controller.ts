import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../user/user.decorator";
import { CreateApplyDto } from "./apply.dto";
import { AppliesService } from "./apply.service";

@Controller("applies")
export class AppliesController {
  constructor(private readonly appliesService: AppliesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getApplies(@CurrentUser() user: User) {
    return this.appliesService.applies(user);
  }

  @Post("reject")
  @UseGuards(JwtAuthGuard)
  async rejectWithoutCV(@CurrentUser() user: User) {
    return this.appliesService.rejectWithoutCV(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":applyId")
  async getApply(@CurrentUser() user: User, @Param("applyId") applyId: number) {
    return this.appliesService.apply(+applyId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":offerId")
  async createApply(
    @CurrentUser() user: User,
    @Body() data: CreateApplyDto,
    @Param("offerId") offerId: number,
  ) {
    return this.appliesService.createApply(user, data, offerId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":applyId")
  async deleteApply(
    @CurrentUser() user: User,
    @Param("applyId") applyId: number,
  ) {
    return this.appliesService.deleteApply(user, +applyId);
  }
}
