import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { mapApi } from 'src/api/api';
import * as nodesData from '../data/map.json';
import { NodesMapType } from '../data/types';

// const prisma = new PrismaClient();

@Injectable()
export class BuildingsService {
  async getInfo(coords: { lat: string; lon: string }) {
    const osmData = await mapApi.fetchOSMData({
      lat: coords.lat,
      lon: coords.lon,
    });

    

    // const res = await mapApi.fetchMap(osmData);
    const jsonNodeMapData = nodesData as unknown as NodesMapType;

    const infoNode = jsonNodeMapData.osm.node.find((node) => {
      return (
        Math.abs(+node['@lat'] - +coords.lat) +
          Math.abs(+node['@lon'] - +coords.lon) <
        0.003
      );
    });
    if (infoNode === null || infoNode === undefined) {
      return 'node not found';
    }
    console.log(infoNode);

    const nodeId = infoNode['@id'];
    const way = jsonNodeMapData.osm.way.find((way) => {
      return (
        way.nd.find((nd) => nd['@ref'] === nodeId) &&
        way.tag.find((tag) => tag['@k'] === 'building')
      );
    });
    console.log(way);

    if (way.tag === undefined) {
      return way;
    }
    const info = way.tag.map((tag) => `${tag['@k']}: ${tag['@v']}`);

    return info;
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
  }
}
