import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { PageOptionsDto } from 'src/shared/dto/pagination.query';
import { CreateJournalInput } from './dto/create-journal.input';
import { Journal } from './entities/journal.entity';
import { JournalService } from './journal.service';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) { }

  @ApiOkResponse({
    description: 'The user records',
    type: Journal,
    isArray: false,
  })
  @Post()
  create(@Body() createJournalDto: CreateJournalInput): Promise<Journal> {
    return this.journalService.create(createJournalDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Paginated Journals',
    type: PaginationDto<Journal>,
  })
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.journalService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Journal Detail',
    type: Journal,
  })
  findOne(@Param('id') id: string) {
    return this.journalService.findOne(+id);
  }
}
