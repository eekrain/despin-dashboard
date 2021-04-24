import React, {useContext} from 'react';
import MyDropzone from '../../../../../../../../shared/components/MyDropzone';
import ArtikelFormContext from '../../../../contexts/artikel-form.context';
import dropzoneArtikelConfig from './dropzone-artikel.config';

const DropzoneArtikel = () => {
  const {handleOnDrop} = useContext(ArtikelFormContext);
  return (
    <MyDropzone
      acceptedFilesExt={dropzoneArtikelConfig.acceptedFilesExt}
      maxFiles={dropzoneArtikelConfig.maxFiles}
      handleOnDrop={handleOnDrop!}
    />
  );
};

export default DropzoneArtikel;
