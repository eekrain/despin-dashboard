import {createContext} from 'react';
import {importOptions} from '../database';
import {IImportPendudukFieldsEnum} from '../database/index';

export interface IPengaturanDatabaseContext {
  dataPenduduk:
    | {
        [key in IImportPendudukFieldsEnum]: string;
      }[]
    | null;
  updateDataPenduduk: (rows: any[]) => Promise<unknown>;
  tes: any[];
  setTes: React.Dispatch<React.SetStateAction<any[]>>;
}

const PengaturanDatabaseContext = createContext<
  Partial<IPengaturanDatabaseContext>
>({});
export const PengaturanDatabaseContextProvider =
  PengaturanDatabaseContext.Provider;
export default PengaturanDatabaseContext;
