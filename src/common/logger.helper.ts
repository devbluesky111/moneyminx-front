// tslint:disable: no-console

export const logger = {
  log(msg: string, data: any) {
    console.log(`___${msg}___`, data);
  },
  group(data: any[], msg?: string) {
    console.group(msg);
    data.forEach((el) => {
      this.log('', el);
    });
    console.groupEnd();
  },
};
