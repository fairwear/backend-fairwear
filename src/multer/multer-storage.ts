import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const storage = diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const filename: string = file.originalname;
    const extension: string = filename.split('.')[1];
    const randomName = uuidv4();
    cb(null, `${randomName}.${extension}`);
  },
});

export default storage;
