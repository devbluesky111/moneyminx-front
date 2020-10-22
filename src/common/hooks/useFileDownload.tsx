import domToImage from 'dom-to-image';
import fileDownload from 'js-file-download';

const useFileDownload = () => {
  return {
    df: (id: string, name: string) => {
      domToImage.toBlob(document.getElementById(id) as any).then((blob) => {
        fileDownload(blob, name + '.png');
      });
    },
  };
};

export default useFileDownload;
