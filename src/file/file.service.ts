import { Injectable, NotFoundException } from '@nestjs/common';
import { createReadStream, existsSync, readFileSync } from 'fs';
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
      if (existsSync(join(process.cwd(), `/uploads/${fileName}`))) {
        return readFileSync(join(process.cwd(), `/uploads/${fileName}`));
      }
      throw new Error('File not found ');
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  imageStream(fileName: string) {
    try {
      if (existsSync(join(process.cwd(), `/uploads/${fileName}`))) {
        return createReadStream(join(process.cwd(), `/uploads/${fileName}`));
      }
      throw new Error('File not found');
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  fileBuffer(fileName: string) {
    try {
      if (existsSync(join(process.cwd(), `/uploads/${fileName}`))) {
        return readFileSync(join(process.cwd(), `/uploads/${fileName}`));
      }
      throw new Error('File not found');
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  fileStream(fileName: string) {
    try {
      if (existsSync(join(process.cwd(), `/uploads/${fileName}`))) {
        return createReadStream(join(process.cwd(), `/uploads/${fileName}`));
      }
      throw new Error('File not found');
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
