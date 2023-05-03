import { Injectable } from '@nestjs/common';
import { Journal, Prisma } from '@prisma/client';
import { PaginationMetaDto } from 'src/shared/dto/pagination.metadata';
import { PageOptionsDto } from 'src/shared/dto/pagination.query';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateJournalInput } from './dto/create-journal.input';

@Injectable()
export class JournalService {
  constructor(private readonly prisms: PrismaService) { }

  create(createJournalDto: CreateJournalInput): Promise<Journal> {
    const date = createJournalDto
      ? new Date(createJournalDto.date)
      : new Date();

    return this.prisms.journal.create({
      data: { ...createJournalDto, date },
    });
  }

  findMany<T extends Prisma.JournalFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.JournalFindManyArgs>,
  ) {
    return this.prisms.journal.findMany({
      ...args,
      orderBy: {
        id: 'desc',
      },
    });
  }

  addOneDay(date: Date) {
    date.setDate(date.getDate() + 1);
    return date;
  }

  async findAll(args: PageOptionsDto) {
    const { skip, take, date } = args;
    let tempArgs: Prisma.JournalFindManyArgs = { take, skip };

    const new_date = new Date(date);
    let next_date = new Date(date);
    next_date = this.addOneDay(next_date);

    if (date) {
      tempArgs = {
        take,
        skip,
        where: {
          date: {
            gte: new_date,
            lte: next_date,
          },
        },
      };
    }

    const data = await this.findMany(tempArgs);

    const total = await this.prisms.journal.count({
      ...(tempArgs.where ? { where: tempArgs.where } : {}),
    });

    const metadata = new PaginationMetaDto({
      total,
      pageOptions: args,
    });

    return {
      metadata,
      data,
    };
  }

  findOne(id: number) {
    return this.prisms.journal.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}
