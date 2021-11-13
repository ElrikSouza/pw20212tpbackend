import { writeFile, rm } from "fs/promises";

const uploadFolder = "public";

const getFileExtension = (mimeType) => {
  return mimeType.split("/")[1];
};

const buildFilename = (mimeType, id) => {
  const extension = getFileExtension(mimeType);
  const filename = `${id}.${extension}`;

  return filename;
};

const buildPath = (filename) => `${uploadFolder}/${filename}`;

const saveImage = async (imageBuffer, mimeType, id) => {
  const filename = buildFilename(mimeType, id);
  const path = buildPath(filename);

  await writeFile(path, imageBuffer);

  return filename;
};

const deleteImage = async (filename) => {
  const path = buildPath(filename);
  await rm(path);
};

const replaceImage = async (oldFilename, imageBuffer, mimeType, id) => {
  await deleteImage(oldFilename);

  return await saveImage(imageBuffer, mimeType, id);
};

export const ImagesService = {
  saveImage,
  deleteImage,
  replaceImage,
};
