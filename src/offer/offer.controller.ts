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
import { CreateOfferDto } from "./offer.dto";
import { OffersService } from "./offer.service";

@Controller("offers")
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  async getOffers(@Query() query) {
    console.log(query);

    return this.offersService.offers(query);
  }

  @Get(":offerId")
  async getOffer(@Param("offerId") offerId: number) {
    return this.offersService.offer(+offerId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOffer(@CurrentUser() user: User, @Body() data: CreateOfferDto) {
    return this.offersService.createOffer(user, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":offerId")
  async deleteOffer(
    @CurrentUser() user: User,
    @Param("offerId") offerId: number,
  ) {
    return this.offersService.deleteOffer(user, +offerId);
  }
}
