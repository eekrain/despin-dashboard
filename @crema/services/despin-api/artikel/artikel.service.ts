import API_URL from '../../../../shared/constants/API_URL';
import Api from '../../ApiConfig';
import ArtikelCreateService from './artikel-create.service';
import ArtikelUpdateService from './artikel-update.service';

const getArtikelCategories = async () => {
  const response = await Api.get(
    `${process.env.NEXT_PUBLIC_API_URL_SERVER}/v1/artikel/kategori`,
    {
      withCredentials: true,
      headers: {
        accept: 'application/json',
      },
    },
  );
  console.log(
    '🚀 ~ file: artikel.service.js ~ line 17 ~ getArtikelKategoriList ~ response',
    response.data,
  );
  return response.data;
};

const getArtikelListByKategori = async (kategoriSlug: string) => {
  const response = await Api.get(
    `${API_URL.getDespinApiUrl()}/v1/artikel/kategori/${kategoriSlug}`,
    {
      withCredentials: true,
      headers: {
        accept: 'application/json',
      },
    },
  );
  console.log(
    '🚀 ~ file: artikel.service.ts ~ line 31 ~ getArtikelListByKategori ~ response',
    response,
  );
  return response.data;
};

const deleteArtikel = async (hashedArtikelId: string) => {
  const response = await Api.delete(
    `${API_URL.getDespinApiUrl()}/v1/artikel/${hashedArtikelId}`,
    {
      withCredentials: true,
      headers: {
        accept: 'application/json',
      },
    },
  );
  console.log(
    '🚀 ~ file: artikel.service.ts ~ line 31 ~ getArtikelListByKategori ~ response',
    response,
  );
  return response.data;
};

const ArtikelService = {
  getArtikelCategories,
  getArtikelListByKategori,
  deleteArtikel,
  create: {
    ...ArtikelCreateService,
  },
  update: {
    ...ArtikelUpdateService,
  },
};

export default ArtikelService;
