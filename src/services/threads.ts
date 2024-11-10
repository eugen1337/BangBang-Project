import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ThreadsService {
  //   async getThreads(section: number): Promise<Array<Thread>> {
  //     try {
  //       const threads = await prisma.threads.findMany({ where: { section } });
  //       return threads;
  //     } catch (e) {
  //       console.error(e);
  //       await prisma.$disconnect();
  //       process.exit(1);
  //     } finally {
  //       await prisma.$disconnect();
  //     }
  //   }
  //   async postThread(
  //     section: number,
  //     tags: Array<string>,
  //     title: string,
  //     content: { text: string; images: Array<string> },
  //   ): Promise<Thread> {
  //     try {
  //       const lastId = (
  //         await prisma.threads.findFirst({ orderBy: { id: 'desc' } })
  //       ).id_;
  //       const thread = await prisma.threads.create({
  //         data: {
  //           id_: lastId + 1,
  //           date: new Date(),
  //           section,
  //           title,
  //           tags,
  //           content,
  //         },
  //       });
  //       return thread;
  //     } catch (e) {
  //       console.error(e);
  //       await prisma.$disconnect();
  //       process.exit(1);
  //     } finally {
  //       await prisma.$disconnect();
  //     }
  //   }
  //   async getThread(section: number, thread_id: number): Promise<Thread> {
  //     try {
  //       const thread = await prisma.threads.findFirst({
  //         where: { section, id_: thread_id },
  //       });
  //       return thread;
  //     } catch (e) {
  //       console.error(e);
  //       await prisma.$disconnect();
  //       process.exit(1);
  //     } finally {
  //       await prisma.$disconnect();
  //     }
  //   }
  //   async getThreadImages(
  //     section: number,
  //     thread_id: number,
  //   ): Promise<Array<string>> {
  //     try {
  //       const images = (
  //         await prisma.threads.findFirst({
  //           select: { content: true },
  //           where: { section, id_: thread_id },
  //         })
  //       ).content.images;
  //       return images;
  //     } catch (e) {
  //       console.error(e);
  //       await prisma.$disconnect();
  //       process.exit(1);
  //     } finally {
  //       await prisma.$disconnect();
  //     }
  //   }
}
