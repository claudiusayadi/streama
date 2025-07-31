import { Injectable } from '@nestjs/common';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';

@Injectable()
export class TvService {
  create(createTvDto: CreateTvDto) {
    return 'This action adds a new tv';
  }

  findAll() {
    return `This action returns all tv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tv`;
  }

  update(id: number, updateTvDto: UpdateTvDto) {
    return `This action updates a #${id} tv`;
  }

  remove(id: number) {
    return `This action removes a #${id} tv`;
  }
}
