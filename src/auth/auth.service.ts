import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'
import { JWTPayload } from './auth.types'

@Injectable()
export class AuthService {
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
}
