import { Crud, CrudController } from '@dataui/crud'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import { AuthRoleGuard } from 'src/auth/auth-role.guard'
import { AuthRoles } from 'src/auth/auth-roles.decorator'

@Crud({
  model: { type: User },
  dto: { create: CreateUserDto, update: UpdateUserDto },
  query: {
    join: {
      cart: { eager: true }
    }
  }
})
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiTags('users')
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @AuthRoles(['admin'])
  @UseGuards(AuthGuard, AuthRoleGuard)
  @Get('/test')
  test() {
    return 'Hello world'
  }
}
