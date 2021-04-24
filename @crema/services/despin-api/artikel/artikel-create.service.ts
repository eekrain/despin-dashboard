import axios from 'axios';
import {NextRouter} from 'next/router';
import {QueryClient} from 'react-query';
import {ModeArtikelImageEnum} from './dto/artikel-create-dto';

export interface IHandleUpload {
  artikelId: string;
  acceptedFiles: any;
  queryClient: QueryClient;
}
const handleUpload = async ({
  artikelId,
  acceptedFiles,
  queryClient,
}: IHandleUpload) => {
  const data = new FormData();
  data.append('artikelId', artikelId);
  acceptedFiles.forEach((file: any) => {
    data.append('images', file, file.name);
  });

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_CLIENT}/v1/artikel/uploadImages`,
      data,
      {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
        },
      },
    );
    console.log('🚀 ~ file: artikel-create.service.ts ~ line 26 ~ res', res);
    queryClient.invalidateQueries(`imagesUploadedArtikel-${artikelId}`);
  } catch (error) {
    console.error(
      '🚀 ~ file: artikel-create.service.ts ~ line 41 ~ error',
      error,
    );
  }
};

const handleTinyUploadImage = async (artikelId: string, blobInfo: any) => {
  const data = new FormData();
  data.append('artikelId', artikelId);
  data.append('image', blobInfo.blob(), blobInfo.filename());

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_CLIENT}/v1/artikel/tinyUploadImage`,
      data,
    );
    return {status: 'success', location: res.data.location};
  } catch (error) {
    return {status: 'error', message: error};
  }
};

const getNewArtikelUploadedImages = async (artikelId: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_CLIENT}/v1/artikel/uploadImages/${artikelId}/TEMP`,
      {
        withCredentials: true,
        headers: {
          accept: 'application/json',
        },
      },
    );
    console.log(
      '🚀 ~ file: artikel-create.service.ts ~ line 52 ~ getNewArtikelUploadedImages ~ res',
      res,
    );
    return res.data;
  } catch (error) {
    console.error(
      '🚀 ~ file: artikel-create.service.ts ~ line 64 ~ getNewArtikelUploadedImages ~ error',
      error,
    );
  }
};

interface IHandleDeleteImage {
  artikelId: string;
  hashedImageId: string;
}
const handleDeleteImage = async ({
  artikelId,
  hashedImageId,
}: IHandleDeleteImage) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL_CLIENT}/v1/artikel/deleteImage/${artikelId}/${hashedImageId}/${ModeArtikelImageEnum.TEMP}`,
    );
  } catch (error) {
    console.error(
      '🚀 ~ file: artikel-create.service.ts ~ line 111 ~ error',
      error,
    );
  }
};

const handleSubmit = async (formikValue: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_CLIENT}/v1/artikel`,
      formikValue,
      {
        withCredentials: true,
        headers: {
          accept: 'application/json',
        },
      },
    );
    console.log(
      '🚀 ~ file: CreateArtikel.container.js ~ line 98 ~ handleSubmit ~ response',
      response,
    );
    return true;
  } catch (error) {
    console.log(
      '🚀 ~ file: artikel-create.service.ts ~ line 150 ~ handleSubmit ~ error',
      error,
    );
    return false;
  }
};

const handleFormikSubmission = async (
  handleSubmit: () => Promise<boolean>,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  routeTo: () => void,
) => {
  setSubmitting(false);
  const isSuccessSubmit = await handleSubmit();

  if (isSuccessSubmit) resetForm();
  setSubmitting(true);
  if (isSuccessSubmit) routeTo();
};

const ArtikelCreateService = {
  handleUpload,
  handleTinyUploadImage,
  getNewArtikelUploadedImages,
  handleDeleteImage,
  handleSubmit,
  handleFormikSubmission,
};

export default ArtikelCreateService;
