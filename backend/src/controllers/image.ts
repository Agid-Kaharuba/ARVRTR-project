import { Request, Response } from "express";
import ProfileImage from "../model/image";
import ResponseService from "../helpers/response";
import { MongoError } from "mongodb";

export default class ImageController{
  public async uploadProfileImage(req: Request, res: Response){
    const originalName = req.file.originalname;
    const mimetype = req.file.mimetype;
    const img = req.file.buffer;
    //const name = originalName.substring(0, originalName.lastIndexOf('.'));
    const name = req.file.originalname
    console.log(name)
    let delet = false;

    if (!checkMime(mimetype)){
      // Add response
      res
      .status(500)
      .send("Error: Wrong file type");
      return;
    }

    await ProfileImage.findOne({name : name}, async function (err: Error, img: typeof ProfileImage){
      if (err){
        console.log(err);
      }
      if (img){
        delet = true;
      }
    });

    if (delet){
      console.log("deleting")
      ProfileImage.deleteOne({name: name}, function(err){
        if (err){
          console.log(err)
        }
      })
    } 

    const newImageRequest = new ProfileImage({
      name,
      mimetype,
      img
    } as any);

    newImageRequest.save((err: MongoError) => {
      if (err) {
				ResponseService.mongoErrorResponse(res, err);
			} else {
				ResponseService.successResponse(res, `${originalName} uploaded!`); // Don't put the model as the message or swagger will crash
			}
    });
  }

  public downloadProfileImage(req: Request, res: Response){
    const name = req.params.username;
    
    ProfileImage.findOne({ name: name }, function (err: Error, image: typeof ProfileImage){
      if (image){
        const fileType = (image as any).mimetype;
        const conversion = ((image as any).img).toString('base64');
        res.set('Content-Type', fileType);
        return res.status(200).send("data:" + fileType + ';base64,' + conversion);
      }
      else{
        //ResponseService.mongoNotFoundResponse(res, "File not found");
        return res.status(200).send(null);
      }
    })
  }
}

function checkMime(mime: String) {
  if (mime === "image/jpeg" ||
      mime === "image/bmp" ||
      mime === "image/png" ||
      mime === "image/tiff" ||
      mime === "image/webp") {
    return true;
  }
  else{
    return false;
  }
}