const cloudinary = require("cloudinary");
import { config } from "../utils";

cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.key,
  api_secret: config.cloudinary.secret,
});

export default cloudinary;
