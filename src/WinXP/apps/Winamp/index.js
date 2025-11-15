import React, { useEffect, useRef } from 'react';
import Webamp from 'webamp';
import { initialTracks } from './config';

function Winamp({ onClose, onMinimize }) {
  const ref = useRef(null);
  const webamp = useRef(null);
  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }
    webamp.current = new Webamp({
      initialTracks,
      // initialSkin: {
      // url:
      //   'https://skins.webamp.org/skin/971c1afc05b56f5160903d0748b73239/Deus_Ex_Amp_by_AJ.wsz', // Add skins in the future
      // },
    });
    webamp.current.renderWhenReady(target).then(() => {
      target.appendChild(document.querySelector('#webamp'));
    });
    return () => {
      webamp.current.dispose();
      webamp.current = null;
    };
  }, []);
  useEffect(() => {
    if (webamp.current) {
      webamp.current.onClose(onClose);
      webamp.current.onMinimize(onMinimize);
    }
  });
  return (
    <div
      style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
      ref={ref}
    />
  );
}

export default Winamp;
