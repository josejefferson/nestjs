import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { ChangePasswordDto } from './dto/change-password.dto'
import { SignInResponseDto } from './dto/sign-in-response.dto'
import { SignInDto } from './dto/sign-in.dto'
import { AuthUser } from './auth-user.decorator'
import { User } from '../users/entities/user.entity'
import { AuthGuard } from './auth.guard'

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignInResponseDto })
  @ApiUnauthorizedResponse()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @Post('change-password')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @AuthUser() authUser: User) {
    return this.authService.changePassword(
      authUser.id,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword
    )
  }
}
