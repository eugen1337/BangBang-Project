import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class SectionsService {
  //   async getSections(): Promise<Section[]> {
  //     try {
  //       const allSections = await prisma.sections.findMany({
  //         select: { id: true, name: true },
  //       });
  //       return allSections;
  //     } catch (e) {
  //       console.error(e);
  //       await prisma.$disconnect();
  //       process.exit(1);
  //     } finally {
  //       await prisma.$disconnect();
  //     }
  //   }
  //   async getSection(id: number): Promise<Section> {
  //     try {
  //       const section = await prisma.sections.findFirst({ where: { id: id } });
  //       return section;
  //     } catch (e) {
  //       console.error(e);
  //       await prisma.$disconnect();
  //       process.exit(1);
  //     } finally {
  //       await prisma.$disconnect();
  //     }
  //   }
}
