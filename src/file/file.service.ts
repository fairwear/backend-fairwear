import { HttpException, Injectable } from '@nestjs/common';
import { F_OK } from 'constants';
import { createReadStream, readFileSync, access } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  async uploadMultipleFiles(files: Array<Express.Multer.File>) {
    const response: { filename: string; path: string }[] = [];
    files.forEach((file) => {
      const fileResponse = {
        filename: file.filename,
        path: file.path,
      };
      response.push(fileResponse);

      return response;
    });
  }

  uploadFile(file: Express.Multer.File, host: string) {
    const protocol = process.env.SECURE ? 'https' : 'http';
    console.log(file);
    const response = {
      filename: file.filename,
      url: `${protocol}://${host}/api/v1/file/${file.filename}`,
    };

    return response;
  }

  imageBuffer(fileName: string) {
    try {
      access(`/uploads/${fileName}`, F_OK, (err: NodeJS.ErrnoException) => {
        if (err) throw new Error(`Error [${err.code}]: ${err.message}`);
      });
      return readFileSync(join(process.cwd(), `/uploads/${fileName}`));
    } catch (err) {
      throw new HttpException(err.message, 404);
    }
  }

  imageStream(fileName: string) {
    try {
      access(`/uploads/${fileName}`, F_OK, (err: NodeJS.ErrnoException) => {
        if (err) throw new Error(`Error [${err.code}]: ${err.message}`);
      });
      return createReadStream(join(process.cwd(), `/uploads/${fileName}`));
    } catch (err) {
      throw new HttpException(err.message, 404);
    }
  }

  fileBuffer(fileName: string) {
    try {
      access(`/uploads/${fileName}`, F_OK, (err: NodeJS.ErrnoException) => {
        if (err) throw new Error(`Error [${err.code}]: ${err.message}`);
      });
      return readFileSync(join(process.cwd(), `/uploads/${fileName}`));
    } catch (err) {
      throw new HttpException(err.message, 404);
    }
  }

  fileStream(fileName: string) {
    try {
      access(`/uploads/${fileName}`, F_OK, (err: NodeJS.ErrnoException) => {
        if (err) throw new Error(`Error [${err.code}]: ${err.message}`);
      });
      return createReadStream(join(process.cwd(), `/uploads/${fileName}`));
    } catch (err) {
      throw new HttpException(err.message, 404);
    }
  }
}
