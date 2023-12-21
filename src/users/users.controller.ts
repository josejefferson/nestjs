import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { TransformDataInterceptor } from 'src/interceptors/transform-data.interceptor'
import { ApiPaginatedResponse } from '../config/pagination/decorators/api-paginated-response.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(new TransformDataInterceptor(UserDto))
  @ApiPaginatedResponse(UserDto)
  findAll(@Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
    return this.usersService.findAllPaginated(page, perPage)
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  @UseInterceptors(new TransformDataInterceptor(UserDto))
  findOne(@Param('id') id: number) {
    return this.usersService.findOne({ id })
  }

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  @UseInterceptors(new TransformDataInterceptor(UserDto))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  @UseInterceptors(new TransformDataInterceptor(UserDto))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({ id: +id }, updateUserDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserDto })
  @UseInterceptors(new TransformDataInterceptor(UserDto))
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id: +id })
  }
}
