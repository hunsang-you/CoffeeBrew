<<<<<<< HEAD
import { useEffect, RefObject } from 'react';

// type CustomMouseEvent = MouseEvent<HTMLDivElement, MouseEvent>;
type HoverType = (ref: RefObject<HTMLElement>, handler: () => void) => void;
// type ListenerType = (
//   event: React.MouseEvent | React.BaseSyntheticEvent,
// ) => void;
=======
import React, { useEffect, MouseEvent, RefObject } from 'react';

// type CustomMouseEvent = MouseEvent<HTMLDivElement, MouseEvent>;
type HoverType = (ref: RefObject<HTMLElement>, handler: () => void) => void;
type ListenerType = (
  event: React.MouseEvent | React.BaseSyntheticEvent,
) => void;
>>>>>>> dcbe80c (feat: 풀페이지 추가중 푸터문제 해결ing)
export const useOnHoverOutside: HoverType = (ref, handler) => {
  useEffect(() => {
    const listener = (event: CustomEvent<React.MouseEvent>) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mouseover', listener as EventListener);
    return () => {
      document.removeEventListener('mouseleave', listener as EventListener);
    };
  }, [ref, handler]);
};
