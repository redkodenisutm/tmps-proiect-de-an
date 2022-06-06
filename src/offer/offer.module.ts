import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { OffersController } from "./offer.controller";
import { OffersService } from "./offer.service";

@Module({
  imports: [],
  controllers: [OffersController],
  providers: [PrismaService, OffersService],
})
export class OfferModule {}
