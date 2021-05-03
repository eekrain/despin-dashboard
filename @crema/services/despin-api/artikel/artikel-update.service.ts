import Api from '../../ApiConfig';
import {QueryClient} from 'react-query';
import {ModeArtikelImageEnum} from './dto/artikel-create-dto';
import {ArtikelUploadedImagesModeEnum} from './dto/artikelUploadedImagesMode.enum';
import {IArtikelUpdateFormikInitValue} from '../../../../modules/DESPIN/admin-web/artikel/artikelForm/update';
import API_URL from '../../../../shared/constants/API_URL';

const getArtikelDataById = async (hashedArtikelId: string) => {
  try {
    const response = await Api.get(
      `${API_URL.getDespinApiUrl()}/v1/artikel/findById/${hashedArtikelId}`,
    );
    return {isSuccess: true, data: response.data};
  } catch (error) {
    console.log(
      '🚀 ~ file: artikel-update.service.ts ~ line 14 ~ getArtikelDataById ~ error',
      error,
    );
    return {isSuccess: false, message: error};
  }
};

const getArtikelMainImageId = async (hashedArtikelId: string) => {
  try {
    const response = await Api.get(
      `${API_URL.getDespinApiUrl()}/v1/artikel/getMainImageId/${hashedArtikelId}`,
    );
    return {isSuccess: true, data: response.data};
  } catch (error) {
    console.log(
      '🚀 ~ file: artikel-update.service.ts ~ line 29 ~ getArtikelMainImageId ~ error',
      error,
    );
    return {isSuccess: false, message: error};
  }
};

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
    const res = await Api.post(
      `${API_URL.getDespinApiUrl()}/v1/artikel/uploadImagesToExistingArtikel`,
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
    const res = await Api.post(
      `${API_URL.getDespinApiUrl()}/v1/artikel/tinyUploadImageToExistingArtikel`,
      data,
    );
    return {status: 'success', location: res.data.location};
  } catch (error) {
    return {status: 'error', message: error};
  }
};

const getArtikelUploadedImages = async (artikelId: string) => {
  try {
    const res = await Api.get(
      `${API_URL.getDespinApiUrl()}/v1/artikel/uploadImages/${artikelId}/${
        ArtikelUploadedImagesModeEnum.PUBLISHED
      }`,
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
    const res = await Api.delete(
      `${API_URL.getDespinApiUrl()}/v1/artikel/deleteImage/${artikelId}/${hashedImageId}/${
        ModeArtikelImageEnum.PUB
      }`,
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
    const response = await Api.patch(
      `${API_URL.getDespinApiUrl()}/v1/artikel`,
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
  isNeedUpdate: boolean,
  handleSubmit: () => Promise<boolean>,
  resetForm: () => void,
  setSubmitting: (isSubmitting: boolean) => void,
  routeTo: () => void,
) => {
  setSubmitting(false);
  let isSuccessSubmit = true;
  if (isNeedUpdate) isSuccessSubmit = await handleSubmit();

  if (isSuccessSubmit) resetForm();
  setSubmitting(true);
  if (isSuccessSubmit) routeTo();
};

const ArtikelUpdateService = {
  getArtikelDataById,
  getArtikelMainImageId,
  handleUpload,
  handleTinyUploadImage,
  getArtikelUploadedImages,
  handleDeleteImage,
  handleSubmit,
  handleFormikSubmission,
};

export default ArtikelUpdateService;
