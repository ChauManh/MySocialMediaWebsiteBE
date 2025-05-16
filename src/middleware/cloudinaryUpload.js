import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// CloudinaryStorage với điều kiện thư mục dựa trên trường `type`
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder = "";

    // Chọn thư mục dựa trên loại hình ảnh
    if (file.fieldname === "profilePicture") {
      folder = "profilePictures"; // Thư mục dành cho ảnh đại diện
    } else if (file.fieldname === "backgroundPicture") {
      folder = "backgroundPictures"; // Thư mục dành cho ảnh nền
    } else if (file.fieldname === "post") {
      folder = "posts"; // Thư mục dành cho ảnh bài viết
    }

    const isVideo = file.mimetype.startsWith("video");

    return {
      folder: `social-media/${folder}`, // Thư mục trên Cloudinary
      resource_type: isVideo ? "video" : "image",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4", "mov"],
      transformation: !isVideo
        ? [
            {
              width: 500,
              height: 500,
              crop: "limit",
              quality: "auto",
              fetch_format: "auto",
            },
          ]
        : undefined,
    };
  },
});

const cloudinaryUpload = multer({ storage });

export default cloudinaryUpload;
