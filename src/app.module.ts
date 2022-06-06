import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApplyModule } from "./apply/apply.module";
import { AuthModule } from "./auth/auth.module";
import { CategoriesController } from "./category/categories.controller";
import { CategoriesService } from "./category/categories.service";
import { CompanyModule } from "./company/company.module";
import { CVModule } from "./cv/cv.module";
import { OfferModule } from "./offer/offer.module";
import { PrismaService } from "./prisma.service";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    CompanyModule,
    OfferModule,
    CVModule,
    ApplyModule,
  ],
  controllers: [AppController, CategoriesController],
  providers: [AppService, PrismaService, CategoriesService],
})
export class AppModule {}
