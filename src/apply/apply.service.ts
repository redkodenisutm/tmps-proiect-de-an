import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Apply, User } from "@prisma/client";
import CVPrototype from "../cv/cv.prototype";
import { PrismaService } from "../prisma.service";
import AppliesCollection from "./applies";
import { CreateApplyDto } from "./apply.dto";

@Injectable()
export class AppliesService {
  constructor(private prisma: PrismaService) {}

  async apply(id: number) {
    const apply = await this.prisma.apply.findUnique({
      where: {
        id: +id,
      },
      include: {
        cv: false,
      },
    });

    if (!apply) {
      throw new HttpException("Apply does not exist", HttpStatus.NOT_FOUND);
    }

    // if (apply?.cv?.userId !== user.id) {
    //   throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    // }

    return apply;
  }

  async applies(user: User) {
    const applies = await this.prisma.apply.findMany({
      include: { cv: true },
      where: {
        cv: {
          userId: user.id,
        },
      },
    });

    return applies;
  }

  async createApply(user: User, applyDto: CreateApplyDto, offerId: number) {
    let createdCVSnapshot;
    let cv;

    if (applyDto?.cvId) {
      cv = await this.prisma.cV.findFirst({
        where: { id: applyDto.cvId },
      });

      if (cv) {
        if (cv.userId !== user.id) {
          throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        const prototype = new CVPrototype(cv);
        console.log("proto", prototype);

        const cvSnapshot = prototype.clone();

        createdCVSnapshot = await this.prisma.cV.create({
          data: {
            ...cvSnapshot,
          },
        });
      }
    }

    return await this.prisma.apply.create({
      data: {
        ...applyDto,
        cvId: cv ? createdCVSnapshot.id : 0,
        offerId: +offerId,
        status: "pending",
      },
    });
  }

  async deleteApply(user: User, id: number) {
    const apply = await this.prisma.apply.findFirst({
      where: { id, NOT: { cvId: 0 } },
      include: { cv: { select: { userId: true } } },
    });

    if (!apply) {
      throw new HttpException("Apply does not exist", HttpStatus.CONFLICT);
    }

    if (apply.cv.userId !== user.id) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    return this.prisma.apply.delete({
      where: {
        id,
      },
    });
  }

  async rejectWithoutCV(user: User) {
    const company = await this.prisma.company.findFirst({
      where: {
        creatorId: user.id,
      },
    });

    if (!company) {
      throw new HttpException("Company does not exist", HttpStatus.NOT_FOUND);
    }

    const applies = await this.prisma.apply.findMany({
      include: {
        offer: true,
      },
      where: {
        offer: {
          companyId: company.id,
        },
      },
    });

    const appliesCollection = new AppliesCollection(applies);

    const quicksIterator = appliesCollection.getQuicksIterator();

    for (
      let i = quicksIterator.first();
      quicksIterator.hasNext();
      i = quicksIterator.next()
    ) {
      await this.prisma.apply.update({
        where: {
          id: i.id,
        },
        data: {
          status: "rejected",
        },
      });
    }

    return this.prisma.apply.findMany({
      include: {
        offer: true,
      },
      where: {
        offer: {
          companyId: company.id,
        },
      },
    });
  }
}
