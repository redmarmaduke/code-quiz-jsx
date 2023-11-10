import React from "react";

export default function useInterval(
  cb: () => undefined,
  ms: number = 1,
  deps: React.DependencyList = []
) {
  const handle = React.useRef<number | undefined>(undefined);
  const msSinceEpoch = React.useRef<number>(Date.now().valueOf());

  // since args is an array, it's used to check that args contents haven't changed
  React.useEffect(() => {    
    // if first render or any props have changed then clear the interval and restart

    const msSinceEpochNow = Date.now().valueOf();
    const t = ms - ((msSinceEpochNow - msSinceEpoch.current) % ms);

    function handler() {
      msSinceEpoch.current = Date.now().valueOf();
      handle.current = setTimeout(handler, ms);
      cb();
    }

    clearTimeout(handle.current);    
    handle.current = setTimeout(handler, t);

    return () => { clearTimeout(handle.current); };
  }, [ms, ...deps]);

  // memoize the callback so it's only recreated on props change
  return () => { clearTimeout(handle.current); handle.current = undefined };
}
