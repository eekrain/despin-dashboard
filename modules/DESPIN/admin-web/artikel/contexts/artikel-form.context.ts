import {createContext} from 'react';
import {QueryClient, UseMutationResult, UseQueryResult} from 'react-query';
import {IHandleUpload} from '../../../../../@crema/services/despin-api/artikel/artikel-create.service';
import {IArtikelFormFormikValues} from '../dto/artikel-form-formik-value.dto';

export enum ArtikelFormModeEnum {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export interface IArtikelFormContext {
  mode: ArtikelFormModeEnum;
  artikelId: string;
  categorySlug: string;
  appTitle: string;
  imagesUploaded: UseQueryResult<any, unknown>;
  uploadMutation: UseMutationResult<void, unknown, IHandleUpload, unknown>;
  handleOnDrop: (acceptedFiles: any[]) => Promise<void>;
  editorKey: string;
  clearEditor: () => void;
  redirectToArtikelList: () => Promise<void>;
  handleDeleteImage: (hashedImageId: string) => Promise<void>;
}

const ArtikelFormContext = createContext<Partial<IArtikelFormContext>>({});
export const ArtikelFormContextProvider = ArtikelFormContext.Provider;
export default ArtikelFormContext;
