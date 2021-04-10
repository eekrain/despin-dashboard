import Api from '../../ApiConfig';
import {IArtikelCategories} from '../../../../pages/admin-web/artikel';

const getArtikelCategories = async () => {
  const response = await Api.get(`/api/v1/artikel/kategori`, {
    withCredentials: true,
    headers: {
      accept: 'application/json',
    },
  });
  console.log(
    '🚀 ~ file: artikel.service.js ~ line 17 ~ getArtikelKategoriList ~ response',
    response.data,
  );
  return response.data;
};

const getArtikelListByKategori = async (kategoriSlug: string) => {
  const response = await Api.get(`/api/v1/artikel/kategori/${kategoriSlug}`, {
    withCredentials: true,
    headers: {
      accept: 'application/json',
    },
  });
  console.log(
    '🚀 ~ file: artikel.service.ts ~ line 31 ~ getArtikelListByKategori ~ response',
    response,
  );
  return response.data;
};

const ArtikelService = {
  getArtikelCategories,
  getArtikelListByKategori,
};

export default ArtikelService;
