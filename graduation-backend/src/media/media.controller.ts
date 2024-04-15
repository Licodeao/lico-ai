import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public',
        filename: (_, file: any, cb) => {
          const timestamp = new Date().getTime();
          file.timestamp = timestamp;
          const fileName = `${timestamp}${extname(file.originalname)}`;
          return cb(null, fileName);
        },
      }),
    }),
  )
  async uploadMediaFile(
    @UploadedFile() file: Express.Multer.File & { timestamp: number },
  ) {
    const { originalname, mimetype, size, timestamp } = file;
    const fileName = `${timestamp}${extname(originalname)}`;
    await this.mediaService.save({
      fileName,
      mimetype,
      size,
    });

    return {
      imageUrl: `http://localhost:3000/public/${fileName}`,
    };
  }

  @Post('/add')
  async addMediaToAlbum(@Body() body) {
    console.log(body);
    // return await this.mediaService.moveMediaToAlbum()
  }
}
