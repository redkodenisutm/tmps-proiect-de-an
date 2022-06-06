import { Company } from "@prisma/client";
import { PrismaService } from "../prisma.service";

class CompanyDecorator {
  company: Company;

  constructor(private prisma: PrismaService, company: Company) {
    this.company = company;
  }

  async findRelatedCategories() {
    const categories = await this.prisma.category.findMany({
      where: {
        offers: {
          some: {
            companyId: this.company.id,
          },
        },
      },
    });

    return categories;
  }

  async findSimilarCompanies() {
    const relatedCateogories = await this.findRelatedCategories();
    const similarCompanies = await this.prisma.company.findMany({
      where: {
        offers: {
          some: {
            categoryId: {
              in: relatedCateogories.map((category) => category.id),
            },
          },
        },
      },
    });

    return similarCompanies.filter((company) => company.id !== this.company.id);
  }
}

export default CompanyDecorator;
