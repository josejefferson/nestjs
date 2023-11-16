import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username, password) {
    const user = await this.usersService.findOneByUsername(username)
    console.log(user)

    if (!user) {
      throw new UnauthorizedException()
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, username: user.username }
    const jwt = await this.jwtService.signAsync(payload)
    return { jwt, user }
  }
}
