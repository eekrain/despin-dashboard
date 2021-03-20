import axios from "axios";
import config from "../../config";

const handleUpload = (artikelId, acceptedFiles, queryClient) => {
  let data = new FormData();
  acceptedFiles.forEach((file) => {
    data.append("images", file, file.name);
  });

  return axios
    .post(
      `${config.DESPIN_API_URL}/v1/artikel/uploadImages/${artikelId}`,
      data,
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    )
    .then((response) => {
      queryClient.invalidateQueries("imagesUploaded");
      console.log(
        "🚀 ~ file: ArtikelFormContainer.js ~ line 27 ~ .then ~ response",
        response
      );
      return response;
    })
    .catch((error) => {
      console.log(
        "🚀 ~ file: create.js ~ line 42 ~ ArtikelCreate ~ error",
        error
      );
    });
};

const getNewArtikelUploadedImages = (artikelId) => {
  return axios
    .get(`${config.DESPIN_API_URL}/v1/artikel/uploadImages/${artikelId}/PUB`, {
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    })
    .then((response) => {
      console.log(
        "🚀 ~ file: ArtikelFormContainer.js ~ line 48 ~ .then ~ response",
        response
      );
      return response;
    });
};

const handleSetDefaultImage = (artikelId, hashedTempImageId, queryClient) => {
  const dataSetDefaultImage = { artikelId, hashedTempImageId, type: "PUB" };
  return axios
    .patch(
      `${config.DESPIN_API_URL}/v1/artikel/setAsMainImage`,
      dataSetDefaultImage,
      {
        withCredentials: true,
        headers: {
          accept: "application/json",
        },
      }
    )
    .then((response) => {
      queryClient.invalidateQueries("imagesUploaded");
      return response;
    })
    .catch((error) => {
      console.error(
        "🚀 ~ file: ArtikelFormContainer.js ~ line 76 ~ .then ~ error",
        error
      );
    });
};

const ArtikelUpdateService = {
  handleUpload,
  getNewArtikelUploadedImages,
  handleSetDefaultImage,
};

export default ArtikelUpdateService;
