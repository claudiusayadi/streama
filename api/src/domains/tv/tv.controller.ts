import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TvService } from './tv.service';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';

@Controller('tv')
export class TvController {
  constructor(private readonly tvService: TvService) {}

  @Post()
  create(@Body() createTvDto: CreateTvDto) {
    return this.tvService.create(createTvDto);
  }

  @Get()
  findAll() {
    return this.tvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTvDto: UpdateTvDto) {
    return this.tvService.update(+id, updateTvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tvService.remove(+id);
  }
}
