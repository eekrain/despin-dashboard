import API_URL from '../../../../../shared/constants/API_URL';
import Api from '../../../ApiConfig';
import IApiStatus from '../../../dto/api-status.dto';

const PengaturanDatabaseService = {
  importPenduduk: async (penduduk: any): Promise<IApiStatus> => {
    try {
      await Api.post(
        `${API_URL.getDespinApiUrl()}/v1/pengaturan-dashboard/database/importPenduduk`,
        {dataImport: penduduk},
      );
      return {isSuccess: true};
    } catch (error) {
      console.log(
        '🚀 ~ file: pengaturan-database.service.ts ~ line 15 ~ importPenduduk: ~ error',
        error,
      );
      return {isSuccess: false, message: error};
    }
  },
};

export default PengaturanDatabaseService;
