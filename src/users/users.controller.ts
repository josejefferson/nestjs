import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
// import { AuthUser } from 'src/auth/auth-user.decorator'
import { Crud, CrudController } from '@dataui/crud'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Crud({
  model: { type: User },
  dto: { create: CreateUserDto, update: UpdateUserDto },
  query: {
    join: {
      cart: { eager: true }
    }
  }
})
// @UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiTags('users')
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
