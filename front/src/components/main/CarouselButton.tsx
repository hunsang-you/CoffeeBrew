import { ReactComponent as ArrowIcon } from '../../../public/mainImg/ic_arrow.svg';

interface CarouselProps {
  direction: any;
  onClick: () => void;
}

export default function CarouselButton({ direction, onClick }: CarouselProps) {
  return (
    <button onClick={onClick} className={`btn-slide-control btn-${direction}`}>
      <ArrowIcon width="16" height="16" fill="#333" />
    </button>
  );
}
