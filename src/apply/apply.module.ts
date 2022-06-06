import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AppliesController } from "./apply.controller";
import { AppliesService } from "./apply.service";

@Module({
  imports: [],
  controllers: [AppliesController],
  providers: [PrismaService, AppliesService],
})
export class ApplyModule {}
