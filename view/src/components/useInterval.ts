/// <reference types="node"/>

import React from 'react';

/**
 * useInterval
 * @param {function} cb callback to be invoked very ms milliseconds
 * @param {number} ms millisecond interval
 * @return {void}
 */
export default function useInterval(
    cb: () => void,
    ms: number = 1,
) {
  const handle = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const msSinceEpoch = React.useRef<number>(Date.now().valueOf());

  // since args is an array, it's used to check that args contents
  // haven't changed
  React.useEffect(() => {
    // if first render or any props have changed then clear the
    // interval and restart

    const msSinceEpochNow = Date.now().valueOf();
    const t = ms - ((msSinceEpochNow - msSinceEpoch.current) % ms);

    /**
     * setTimeout handler
     */
    function handler() {
      console.log('userInterval:handler()');
      msSinceEpoch.current = Date.now().valueOf();
      handle.current = setTimeout(handler, ms);
      cb();
    }

    console.log('userInterval()');
    clearTimeout(handle.current);
    handle.current = setTimeout(handler, t);

    return () => {
      clearTimeout(handle.current); console.log('interval unmounted');
    };
  }, [cb, ms]);

  // memoize the callback so it's only recreated on props change
  return () => {
    clearTimeout(handle.current);
    handle.current = undefined;
    console.log('interval explicitly stopped');
  };
}
