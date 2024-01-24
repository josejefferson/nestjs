import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { jwtConstants } from 'src/config/jwt'
import { JWTPayload } from './auth.types'
import { UsersService } from 'src/users/users.service'
import { plainToInstance } from 'class-transformer'
import { User } from 'src/users/users.entity'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    const payload = await this.validateToken(token)
    const user = await this.validateUser(payload.id)

    request['authUser'] = plainToInstance(User, user)

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

  private async validateToken(token?: string) {
    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync<JWTPayload>(token, {
        secret: jwtConstants.secret
      })
      return payload
    } catch {
      throw new UnauthorizedException()
    }
  }

  private async validateUser(id: JWTPayload['id']) {
    const user = this.usersService.findOne({ id })
    if (!user) {
      throw new UnauthorizedException('The authenticated user no longer exists')
    }
    return user
  }
}
