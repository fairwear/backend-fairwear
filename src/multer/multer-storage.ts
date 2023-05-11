import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const regExp = /(?:\.([^.]+))?$/;

export const storage = diskStorage({
  destination: 'src/uploads/',
  filename: (req, file, cb) => {
    const filename: string = file.originalname;
    const regExpExecArray = regExp.exec(filename);
    const extension = regExpExecArray ? regExpExecArray[1] : undefined;
    const randomName = uuidv4();
    cb(null, `${randomName}.${extension}`);
  },
});

export default storage;
