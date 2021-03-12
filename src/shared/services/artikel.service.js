import axios from "axios";
import config from "../../config";

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
  console.log(
    "🚀 ~ file: artikel.service.js ~ line 27 ~ getArtikelListByKategori ~ response",
    response
  );
  return response.data;
};

const ArtikelService = {
  getArtikelKategoriList,
  getArtikelListByKategori,
};

export default ArtikelService;
