import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { User, Prisma } from "@prisma/client";
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from "./user.dto";
import { compare, hash } from "bcrypt";

interface FormatEmail extends Partial<User> {
  email: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Partial<User> | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    } = {},
  ): Promise<Partial<User>[]> {
    return this.prisma.user.findMany({
      ...params,
      select: {
        id: true,
        email: true,
        password: false,
      },
    });
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });

    if (userInDb) {
      throw new HttpException("user_already_exist", HttpStatus.CONFLICT);
    }

    const password = await hash(userDto.password, 10);
    return await this.prisma.user.create({
      data: {
        ...userDto,
        password,
      },
    });
  }

  async login(loginUserDto: LoginUserDto): Promise<FormatEmail> {
    const { email, password } = loginUserDto;
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    const { password: p, ...rest } = user;
    return rest;
  }

  async findById(id: number): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  //use by user module to change user password
  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await compare(payload.old_password, user.password);
    if (!areEqual) {
      throw new HttpException("invalid_credentials", HttpStatus.UNAUTHORIZED);
    }
    return await this.prisma.user.update({
      where: { id },
      data: { password: await hash(payload.new_password, 10) },
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
