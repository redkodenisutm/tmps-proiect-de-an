import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import CompanyDecorator from "./company.decorator";
import { CreateCompanyDto, UpdateCompanyDto } from "./company.dto";
import CompanyProxy, { Action } from "./company.proxy";

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async company(id: number) {
    const company = await this.prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!company) {
      throw new HttpException("Company does not exist", HttpStatus.CONFLICT);
    }

    const decoratedCompany = new CompanyDecorator(this.prisma, company);

    return {
      ...company,
      categories: await decoratedCompany.findRelatedCategories(),
      similarCompanies: await decoratedCompany.findSimilarCompanies(),
    };
  }

  async companies() {
    return this.prisma.company.findMany();
  }

  async createCompany(creatorId: number, companyDto: CreateCompanyDto) {
    const companyInDb = await this.prisma.company.findFirst({
      where: { name: companyDto.name },
    });

    if (companyInDb) {
      throw new HttpException("Company name is taken", HttpStatus.CONFLICT);
    }

    return await this.prisma.company.create({
      data: {
        creatorId,
        ...companyDto,
      },
    });
  }

  async updateCompany(user: User, data: UpdateCompanyDto) {
    const proxy = new CompanyProxy(this.prisma, Action.UPDATE);

    const methods = await proxy.getPrismaObject({
      user,
      updateRequest: data,
    });

    return methods.update({
      data: { ...data },
      where: {
        id: +data.id,
      },
    });
  }

  async deleteCompany(user: User, id: number) {
    const proxy = new CompanyProxy(this.prisma, Action.DELETE);
    const methods = await proxy.getPrismaObject({ user, id: +id });

    return methods.delete({
      where: {
        id: +id,
      },
    });
  }
}
