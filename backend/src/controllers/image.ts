import { Request, Response } from 'express';
// import { MongoError } from 'mongodb';
import ProfileImage from '../model/image';
import ResponseService from '../helpers/response';

function checkMime(mime: string) {
  if (mime === 'image/jpeg'
    || mime === 'image/bmp'
    || mime === 'image/png'
    || mime === 'image/tiff'
    || mime === 'image/webp') {
    return true;
  }

  return false;
}

export default class ImageController {
  public async uploadProfileImage(req: Request, res: Response) {
    // @ts-ignore
    const originalName = req.file.originalname;
    // @ts-ignore
    const { mimetype } = req.file;
    // @ts-ignore
    const img64 = req.file.buffer.toString('base64');
    // @ts-ignore
    const img = `data:${mimetype};base64,${img64}`;
    // @ts-ignore
    const name = req.file.originalname;
    let delet = false;

    if (!checkMime(mimetype)) {
      // Add response
      res
        .status(500)
        .send('Error: Wrong file type');
      return;
    }

    // eslint-disable-next-line no-shadow
    await ProfileImage.findOne({ name }, async (err: Error, img: typeof ProfileImage) => {
      if (err) {
        throw err;
      }
      if (img) {
        delet = true;
      }
    });

    if (delet) {
      ProfileImage.deleteOne({ name }, undefined, (err) => {
        if (err) {
          throw err;
        }
      });
    }

    const newImageRequest = new ProfileImage({
      name,
      mimetype,
      img,
    } as any);

    newImageRequest.save((err: any) => {
      if (err) {
        ResponseService.mongoErrorResponse(res, err);
      } else {
        ResponseService.successResponse(res, `${originalName} uploaded!`); // Don't put the model as the message or swagger will crash
      }
    });
  }

  public downloadProfileImage(req: Request, res: Response) {
    const name = req.params.username;

    ProfileImage.findOne({ name }, (err: Error, image: typeof ProfileImage) => {
      if (image) {
        return res.status(200).send((image as any).img)
      }
      // ResponseService.mongoNotFoundResponse(res, "File not found");
      return res.status(200).send('https://i.pinimg.com/236x/1f/25/5d/1f255d7f9cf3afe7cd9cd97626d08fbf.jpg');
    });
  }
}
