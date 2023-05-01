import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer-config.service';

MulterModule.registerAsync({
  useClass: MulterConfigService,
});
