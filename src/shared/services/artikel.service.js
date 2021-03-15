import axios from "axios";
import config from "../../config";
import ArtikelUpdateService from "./artikel-update.service";

const getArtikelKategoriList = async () => {
  const response = await axios.get(
    `${config.DESPIN_API_URL}/v1/artikel/kategori`,
    {
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    }
  );
  console.log(
    "🚀 ~ file: artikel.service.js ~ line 17 ~ getArtikelKategoriList ~ response",
    response.data
  );
  return response.data;
};

const getArtikelListByKategori = async (kategoriSlug) => {
  const response = await axios.get(
    `${config.DESPIN_API_URL}/v1/artikel/kategori/${kategoriSlug}`,
    {
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    }
  );
  return response.data;
};

const getArtikelDataByHashedId = async (hashedId) => {
  const response = await axios.get(
    `${config.DESPIN_API_URL}/v1/artikel/findById/${hashedId}`,
    {
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    }
  );
  return response.data;
};

const deletePublishedArtikelByHashedId = async (hashedId) => {
  const response = await axios.delete(
    `${config.DESPIN_API_URL}/v1/artikel/${hashedId}`,
    {
      withCredentials: true,
      headers: {
        accept: "application/json",
      },
    }
  );
  console.log(
    "🚀 ~ file: artikel.service.js ~ line 54 ~ deletePublishedArtikelByHashedId ~ response",
    response
  );
  return response;
};

const ArtikelService = {
  getArtikelKategoriList,
  getArtikelListByKategori,
  getArtikelDataByHashedId,
  deletePublishedArtikelByHashedId,
  update: {
    ...ArtikelUpdateService,
  },
};

export default ArtikelService;
