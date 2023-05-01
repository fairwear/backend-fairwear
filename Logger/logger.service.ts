import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { MyLogger } from "./mylogger";

export class LoggerService {
  static async start() {
    const logger = new MyLogger();
    logger.log('Hello, application started running!');

    // const logger = new MyLogger();
    // logger.error(logger.error('Error message', exception.stack););


    const app = await NestFactory.create(AppModule, {
      logger,
    });
  
    await app.listen(3000);
  }
}
