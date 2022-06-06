import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CVsController } from "./cv.controller";
import { CVsService } from "./cv.service";

@Module({
  imports: [],
  controllers: [CVsController],
  providers: [PrismaService, CVsService],
})
export class CVModule {}
