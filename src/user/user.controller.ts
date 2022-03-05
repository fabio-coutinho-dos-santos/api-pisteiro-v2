import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ErrorHandlerInterceptor } from 'src/interceptors/error-handler.interceptor';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  OBJECT_LIMIT = 50;

  @Get('count/')
  @UseInterceptors(ErrorHandlerInterceptor)
  countAll() {
    return this.userService.countAll();
  }

  @Get('public-profile/:id')
  @UseInterceptors(ErrorHandlerInterceptor)
  findOnePublicProfile(@Param('id') id: string) {
    return this.userService.findOnePublicProfile(id);
  }

  @Get('public-profile/select/:ids')
  @UseInterceptors(ErrorHandlerInterceptor)
  findSomePublicProfile(@Param('ids') ids: string) {
    return this.userService.findSomePublicProfile(ids.split(','));
  }
}
