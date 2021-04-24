import {artikelFormFormikFieldNameEnum} from './artikel-form-formik-field-name.enum';

export interface IArtikelFormFormikValues {
  [artikelFormFormikFieldNameEnum.hashedArtikelId]?: string;
  [artikelFormFormikFieldNameEnum.tempArtikelId]?: string;
  [artikelFormFormikFieldNameEnum.categorySlug]: string;
  [artikelFormFormikFieldNameEnum.title]: string;
  [artikelFormFormikFieldNameEnum.body]: string;
  [artikelFormFormikFieldNameEnum.mainImageId]: string;
}
