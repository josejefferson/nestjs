import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { TransformDataInterceptor } from 'src/interceptors/transform-data.interceptor'
import { ApiPaginatedResponse } from '../config/pagination/decorators/api-paginated-response.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'
import { AuthUser } from 'src/auth/auth-user.decorator'

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @UseInterceptors(new TransformDataInterceptor(UserDto))
  @ApiPaginatedResponse(UserDto)
  findAll(@Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
    return this.service.findAllPaginated(page, perPage)
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  @UseInterceptors(new TransformDataInterceptor(UserDto))
  findOne(@Param('id') id: number) {
    return this.service.findOne({ id })
  }

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  @UseInterceptors(new TransformDataInterceptor(UserDto))
  create(@Body() data: CreateUserDto, @AuthUser() authUser: UserDto) {
    return this.service.create(data, authUser)
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  @UseInterceptors(new TransformDataInterceptor(UserDto))
  update(@Param('id') id: number, @Body() data: UpdateUserDto, @AuthUser() authUser: UserDto) {
    return this.service.update({ id }, data, authUser)
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  @UseInterceptors(new TransformDataInterceptor(UserDto))
  remove(@Param('id') id: number) {
    return this.service.remove({ id })
  }
}
