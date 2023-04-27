import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import storage from '../multer/multer-storage';
import { FileService } from './file.service';

@ApiTags('file')
@Controller('api/v1/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: storage,
    }),
  )
  uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const response = this.fileService.uploadMultipleFiles(files);
    return response;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage,
    }),
  )
  uploadFile(
    @Headers() headers: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const response = this.fileService.uploadFile(file, headers.host);
    return response;
  }

  @Get(':filename')
  buffer(@Param('filename') fileName: string, @Res() response: Response) {
    const file = this.fileService.imageBuffer(fileName);
    response.contentType('image/png');
    response.send(file);
  }

  @Get('stream/:filename')
  stream(@Param('filename') fileName: string, @Res() response: Response) {
    const file = this.fileService.imageStream(fileName);
    file.pipe(response);
  }

  @Get('streamable/:filename')
  streamable(
    @Param('filename') fileName: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = this.fileService.fileStream(fileName);
    return new StreamableFile(file);
  }
}
