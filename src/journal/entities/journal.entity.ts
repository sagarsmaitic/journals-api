import { ApiProperty } from '@nestjs/swagger';

export class Journal {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  body: string;
}
