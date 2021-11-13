import { writeFile, rm } from "fs/promises";

const uploadFolder = "public";

const getFileExtension = (mimeType) => {
  return mimeType.split("/")[1];
};

const saveImage = async (imageBuffer, mimeType, id) => {
  const extension = getFileExtension(mimeType);
  const filename = `${id}.${extension}`;
  const path = `${uploadFolder}/${filename}`;

  await writeFile(path, imageBuffer);

  return filename;
};

const deleteImage = async (imagePath) => {
  await rm(imagePath);
};

const replaceImage = async (oldPath, path, imageBuffer) => {
  if (oldPath !== path) {
    await deleteImage(oldPath);
  }

  await writeFile(path, imageBuffer);
};

export const ImagesService = {
  saveImage,
  deleteImage,
  replaceImage,
};
