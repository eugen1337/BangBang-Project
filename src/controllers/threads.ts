import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ThreadsService } from 'src/services/threads';

@Controller('sections')
export class ThreadsController {
  // constructor(private readonly threadsService: ThreadsService) {}
  // @Get(':section/thre/*  */ads/') // получить ветки из раздела
  // @ApiOperation({ summary: 'Returns a threads from specified section' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Success',
  //   type: [Thread],
  // })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // async getThreadsBySection(
  //   @Param('section') section: number,
  // ): Promise<Array<Thread>> {
  //   if (!isNaN(Number(section))) {
  //     const threads = await this.threadsService.getThreads(Number(section));
  //     return threads;
  //   } else throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  // }
  // @Post(':section/threads') // создать ветку в разделе
  // @ApiOperation({ summary: 'Posts a thread in specified section' })
  // @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Thread })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // async postThreadBySection(
  //   @Param('section') section: number,
  //   @Body() thread: CreateThread,
  // ): Promise<Thread> {
  //   if (!isNaN(Number(section))) {
  //     console.log(`POST THREAD: ${thread.title}`)
  //     const res = await this.threadsService.postThread(
  //       Number(section),
  //       thread.tags,
  //       thread.title,
  //       thread.content,
  //     );
  //     return res;
  //   } else throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  // }
  // @Get(':section/threads/:thread') // получить определённую ветку
  // @ApiOperation({ summary: 'Returns a single specified thread' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Success',
  //   type: [Thread],
  // })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // async getThread(
  //   @Param('section') section: number,
  //   @Param('thread') thread_id: number,
  // ): Promise<Thread> {
  //   if (!isNaN(Number(section)) && !isNaN(Number(thread_id))) {
  //     const thread = await this.threadsService.getThread(
  //       Number(section),
  //       Number(thread_id),
  //     );
  //     if (!thread) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  //     return thread;
  //   } else throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  // }
  // @Get(':section/threads/:thread/images') // получить картинку ветки
  // @Header('Content-Type', 'image/jpeg')
  // @ApiOperation({ summary: 'Returns a single specified thread' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Success',
  //   type: [Thread],
  // })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // async getThreadImage(
  //   @Param('section') section: number,
  //   @Param('thread') thread_id: number,
  // ): Promise<string> {
  //   if (!isNaN(Number(section)) && !isNaN(Number(thread_id))) {
  //     const images = await this.threadsService.getThreadImages(
  //       Number(section),
  //       Number(thread_id),
  //     );
  //     if (!images) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  //     return images;
  //   } else throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  // }
}
