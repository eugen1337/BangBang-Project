import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { BuildingsService } from '../services/buildings';
import { Coordinates } from 'src/types/globalTypes';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly SectionService: BuildingsService) {}

  @Get('information')
  async getSections(@Query() coords: { lat: string; lon: string }) {
    console.log(coords);

    try {
      return await this.SectionService.getInfo(coords);
    } catch (err: any) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: err,
        },
      );
    }
  }

  // @Post() // получить все разделы
  // @ApiOperation({ summary: "Returns all sections" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [Section] })
  // async postSections(): Promise<Section> {
  //   return (await this.SectionService.postSection());
  // }

  // @Get(':section_id') // получить определённый раздел
  // @ApiOperation({ summary: 'Returns a section with specified id' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Success',
  //   type: [Section],
  // })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  // async getSection(@Param('section_id') section_id: number): Promise<Section> {
  //   if (!isNaN(Number(section_id))) {
  //     const section = await this.SectionService.getSection(Number(section_id));

  //     if (!section)
  //       throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  //     return section;
  //   } else throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  // }
}
