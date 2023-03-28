import { useEffect, RefObject } from 'react';

// type CustomMouseEvent = MouseEvent<HTMLDivElement, MouseEvent>;
type HoverType = (ref: RefObject<HTMLElement>, handler: () => void) => void;
// type ListenerType = (
//   event: React.MouseEvent | React.BaseSyntheticEvent,
// ) => void;

/**hover 훅 */
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
