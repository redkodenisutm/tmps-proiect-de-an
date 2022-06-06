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
import { CreateCompanyDto, UpdateCompanyDto } from "./company.dto";
import { CompaniesService } from "./company.service";

@Controller("companies")
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async getCompanies() {
    return this.companiesService.companies();
  }

  @Get(":companyId")
  async getCompany(@Param("companyId") companyId: number) {
    return this.companiesService.company(+companyId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCompany(
    @CurrentUser("id") creatorId: number,
    @Body() data: CreateCompanyDto,
  ) {
    console.log({ creatorId });

    return this.companiesService.createCompany(creatorId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateCompany(
    @CurrentUser() user: User,
    @Body() data: UpdateCompanyDto,
  ) {
    return this.companiesService.updateCompany(user, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":companyId")
  async deleteCompany(
    @CurrentUser() user: User,
    @Param("companyId") companyId: number,
  ) {
    return this.companiesService.deleteCompany(user, +companyId);
  }
}
