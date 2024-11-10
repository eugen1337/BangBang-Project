import { Module } from '@nestjs/common';
import { BuildingsController } from './controllers/buildings';
import { BuildingsService } from './services/buildings';

@Module({
  imports: [],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class AppModule {}
