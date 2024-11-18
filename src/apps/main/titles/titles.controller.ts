import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { TitlesService } from './titles.service';

@Controller('titles')
export class TitlesController {
  constructor(private readonly titleService: TitlesService) {}

  @Post()
  create(@Body() createTitleDto: CreateTitleDto) {
    return this.titleService.create(createTitleDto);
  }

  // @Get()
  // findAll(@CurrentUser('username') username: string) {
  //   console.log(username);
  //   return this.titleService.findAll();
  // }

  @Get()
  findAll() {
    return this.titleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.titleService.findOne({ where: { id: +id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTitleDto: UpdateTitleDto) {
    return this.titleService.update({ where: { id: +id } }, updateTitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titleService.remove({ where: { id: +id } });
  }
}
