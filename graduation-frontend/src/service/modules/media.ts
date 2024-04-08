import LiRequest from "../index";

export const createAlbum = async (albumName: string) => {
  return LiRequest.post("/albums/create", {
    name: albumName,
  });
};
