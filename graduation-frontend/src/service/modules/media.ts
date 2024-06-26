import LiRequest from "../index";

export const createAlbum = async (albumName: string) => {
  return LiRequest.post("/albums/create", {
    name: albumName,
  });
};

export const getAllAlbums = () => {
  return LiRequest.get("/albums/findAll");
};

export const uploadMediaFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return LiRequest.post("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const moveMediaToAlbum = (albumName: string, mediaName: string) => {
  const name = mediaName.split("public/")[1];
  return LiRequest.post("/media/add", {
    albumName,
    name,
  });
};

export const findMediaByAlbum = (albumName: string) => {
  return LiRequest.get("albums/findMedia", {
    albumName,
  });
};
