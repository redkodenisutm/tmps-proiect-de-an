import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "./user.decorator";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User): Promise<Partial<User>> {
    return user;
  }
}
