import { HttpException, HttpStatus } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { UpdateCompanyDto } from "./company.dto";

export enum Action {
  DELETE = "delete",
  UPDATE = "update",
}

interface ICompanyProxy {
  getPrismaObject(payload: any): Promise<any>;
}

class CompanyProxy implements ICompanyProxy {
  action: Action;
  constructor(private prisma: PrismaService, action: Action) {
    this.action = action;
  }

  public getPrismaObject = (payload: any) => {
    if (this.action === Action.DELETE) {
      return this.delete(payload.user, payload.id);
    }

    if (this.action === Action.UPDATE) {
      return this.update(payload.user, payload.updateRequest);
    }

    throw new HttpException("Invalid action", HttpStatus.BAD_REQUEST);
  };

  private delete = async (user: User, id: number) => {
    const company = await this.prisma.company.findFirst({
      where: { id },
    });

    if (!company) {
      throw new HttpException("Company does not exist", HttpStatus.CONFLICT);
    }

    if (company.creatorId !== user.id) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    return this.prisma.company;
  };

  private update = async (user: User, data: UpdateCompanyDto) => {
    const companyInDb = await this.prisma.company.findFirst({
      where: { id: data.id },
    });

    if (!companyInDb) {
      throw new HttpException("Company does not exist", HttpStatus.CONFLICT);
    }

    if (companyInDb.creatorId !== user.id) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    if (companyInDb.name !== data.name) {
      const companyInDb = await this.prisma.company.findFirst({
        where: { name: data.name },
      });

      if (companyInDb) {
        throw new HttpException(
          "Company with this name already exists",
          HttpStatus.CONFLICT,
        );
      }
    }

    return this.prisma.company;
  };
}

export default CompanyProxy;
