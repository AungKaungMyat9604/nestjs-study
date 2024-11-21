import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';
import { IsPublic } from './guards/policy/decorator/policy.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('app')
  @IsPublic()
  redirectToIndexFile(@Res() res: Response) {
    res.redirect('/app/index.html');
  }

  @Get('app/*')
  @IsPublic()
  getFile(@Param('0') path: string, @Res() res: Response) {
    const filePath = join(__dirname, '../public/app', path);
    res.sendFile(filePath);
  }
}
