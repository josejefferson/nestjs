import { Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { plainToInstance } from 'class-transformer'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from '../users/users.service'
import { JWTPayload } from './auth.types'

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: JWTPayload = { id: user.id, username: user.username }
    const jwt = await this.jwtService.signAsync(payload, { expiresIn: '30d' })
    return { jwt, user }
  }

  async onModuleInit() {
    const userCount = await this.usersService.count()
    if (userCount === 0) {
      const user = { username: 'admin@admin.com', idade: 0, password: 'admin' }
      await this.usersService.create(plainToInstance(CreateUserDto, user))

      this.logger.warn('Nenhum usuário cadastrado no sistema, um usuário foi criado')
      this.logger.warn('Login: "admin@admin.com"')
      this.logger.warn('Senha: "admin"')
    }
  }
}
