import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, LoginUserDto } from "../user/user.dto";

import { PrismaService } from "../prisma.service";
import { User } from "@prisma/client";

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: User[];
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: "Account created successfully",
    };

    try {
      status.data = await this.userService.createUser(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException("INVALID_TOKEN", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
