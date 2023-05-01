import { NestFactory } from "@nestjs/core";

import { AppModule } from "src/app.module";
import { MyLogger } from "./mylogger";

export class LoggerService {
  static async start() {
    const app = await NestFactory.create(AppModule, {
      logger: new MyLogger(),
    });
    await app.listen(3000);
  }
}

export { MyLogger };
