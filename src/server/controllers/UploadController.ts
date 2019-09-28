import socket from "socket.io";
import cloudinary from "../core/cloudinary";
import { UploadFileModel } from "../models";

class UploadController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  create = (req: any, res: any) => {
    const userId = req.user._id;
    const file: any = req.file;

    cloudinary.v2.uploader
      .upload_stream({ resource_type: "auto" }, (error: any, result: any) => {
        if (error) {
          return res.json({
            status: "error",
            file: error.message
          });
        }

        const fileData = {
          filename: result.original_filename,
          size: result.bytes,
          ext: result.format,
          public_id: result.public_id,
          url: result.url,
          user: userId
        };

        const uploadFile = new UploadFileModel(fileData);

        uploadFile
          .save()
          .then((fileObj: any) => {
            res.json({
              status: "success",
              file: fileObj
            });
          })
          .catch((err: any) => {
            res.json({
              status: "error",
              message: err
            });
          });
      })
      .end(file.buffer);
  };

  delete = (req: any, res: any) => {
    const filePublicId: any = req.params.id;

    cloudinary.v2.uploader.destroy(filePublicId, (error: any, result: any) => {
      if (error) {
        return res.json({
          status: "error",
          file: error.message
        });
      }

      UploadFileModel.find({ public_id: filePublicId })
        .remove()
        .then((fileObj: any) => {
          res.json({
            status: "success"
          });
        })
        .catch((err: any) => {
          res.json({
            status: "error",
            message: err
          });
        });
    });
  };
}

export default UploadController;
