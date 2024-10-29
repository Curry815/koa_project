const path = require("path");

const {
  fileUploadError,
  unSupportedFileTypeError,
} = require("../constant/err.type");

class GoodsController {
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    console.log(file);
    const fileTypes = ["image/jpeg", "image/png"];

    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit("error", unSupportedFileTypeError, ctx);
      }
      ctx.body = {
        code: 0,
        message: "商品图片上传成功",
        result: {
          goods_img: path.basename(file.filepath),
        },
      };
    } else {
      return ctx.app.emit("error", fileUploadError, ctx);
    }
  }
}

module.exports = new GoodsController();
