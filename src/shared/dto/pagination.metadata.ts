import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from './pagination.query';

export interface PaginationMetadataParames {
  pageOptions: PageOptionsDto;
  total: number;
}

export class PaginationMetaDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  total: number;

  constructor({ pageOptions, total: itemCount }: PaginationMetadataParames) {
    this.page = pageOptions.page;
    this.take = pageOptions.take;
    this.total = itemCount;
  }
}
