import React, { useEffect } from 'react';

// type CustomMouseEvent = MouseEvent<HTMLDivElement, MouseEvent>;
type HoverType = (ref: any | object, handler: Function) => void;
type ListenerType = (event: MouseEvent | React.BaseSyntheticEvent) => void;
export const useOnHoverOutside: HoverType = (ref, handler) => {
  useEffect(() => {
    console.log('2');
    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };
    document.addEventListener('mouseover', listener);
    return () => {
      document.removeEventListener('mouseout', listener);
    };
  }, [ref, handler]);
};
