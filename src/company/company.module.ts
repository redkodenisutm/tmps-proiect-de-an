import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CompaniesController } from "./company.controller";
import { CompaniesService } from "./company.service";

@Module({
  imports: [],
  controllers: [CompaniesController],
  providers: [PrismaService, CompaniesService],
})
export class CompanyModule {}
