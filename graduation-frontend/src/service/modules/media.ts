import LiRequest from "../index";

export const createAlbum = async (albumName: string) => {
  return LiRequest.post("/albums/create", {
    name: albumName,
  });
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
