import { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';

import history from 'app/app.history';

export enum EPixelTrack {
  START_TRAIL = 'StartTrial',
  INITIATE_CHECKOUT = 'InitiateCheckout',
  SUBSCRIBE = 'Subscribe',
}

const usePixel = () => {
  useEffect(() => {
    history.listen(() => {
      ReactPixel.pageView();
    });
  }, []);

  return {
    track(title: EPixelTrack, data: any) {
      return ReactPixel.track(title, data);
    },
    fbq(title: EPixelTrack, data: Record<string, any>) {
      return ReactPixel.fbq('track', title, data);
    },
  };
};

export default usePixel;
