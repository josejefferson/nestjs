import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from 'src/users/entities/user.entity'
import { AuthRoles } from './auth-roles.decorator'

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handlerRoles = this.reflector.get<string[]>(AuthRoles, context.getHandler()) ?? []
    const classRoles = this.reflector.get<string[]>(AuthRoles, context.getClass()) ?? []
    const roles = [...handlerRoles, ...classRoles]
    const request = context.switchToHttp().getRequest()
    const user: User = request.authUser
    return this.matchRoles(roles, user.role)
  }

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole)
  }
}
