import domToImage from 'dom-to-image';
import fileDownload from 'js-file-download';

const useFileDownload = () => {
  return {
    df: (id: string, name: string) => {
      domToImage.toBlob(document.getElementById(id) as any).then((blob) => {
        fileDownload(blob, name + '.png');
      });
    },

    getImage: async (id: string): Promise<{ image: any; error: any }> => {
      return new Promise((resolve, reject) => {
        const node = document.getElementById(id) as any;

        domToImage
          .toBlob(node)
          .then((blob) => {
            if (blob) {
              resolve({
                image: blob,
                error: null,
              });
            } else {
              resolve({
                image: null,
                error: 'not found',
              });
            }
          })
          .catch((err) => {
            reject({
              image: null,
              error: `${err}`,
            });
          });
      });
    },
  };
};

export default useFileDownload;
