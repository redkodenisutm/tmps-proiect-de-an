import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { CreateOfferDto } from "./offer.dto";
import OffersCollection from "./offers.collection";
import RecentOffersVisitor from "./RecentOffers.visitor";

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  async offer(id: number) {
    return this.prisma.offer.findUnique({
      where: {
        id,
      },
    });
  }

  async offers(options?: { filter?: string }) {
    const offers = await this.prisma.offer.findMany({});

    if (options?.filter === "recent") {
      const offersCollection = new OffersCollection();
      const recentOffersVisitor = new RecentOffersVisitor();

      offers.forEach((offer) => offersCollection.addOffer(offer));

      return offersCollection.accept(recentOffersVisitor);
    }

    return offers;
  }

  async createOffer(user: User, offerDto: CreateOfferDto) {
    const company = await this.prisma.company.findFirst({
      where: { id: offerDto.companyId },
    });

    const category = await this.prisma.category.findFirst({
      where: { id: offerDto.categoryId },
    });

    if (!company || !category) {
      throw new HttpException(
        "Company or category does not exist",
        HttpStatus.CONFLICT,
      );
    }

    if (company.creatorId !== user.id) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    return await this.prisma.offer.create({
      data: {
        ...offerDto,
        datePublished: new Date().toISOString(),
      },
    });
  }

  async deleteOffer(user: User, id: number) {
    const offer = await this.prisma.offer.findFirst({
      where: { id },
      include: {
        company: {
          select: {
            creatorId: true,
          },
        },
      },
    });

    if (!offer) {
      throw new HttpException("Offer does not exist", HttpStatus.CONFLICT);
    }

    if (offer.company.creatorId !== user.id) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    return this.prisma.offer.delete({
      where: {
        id,
      },
    });
  }
}
