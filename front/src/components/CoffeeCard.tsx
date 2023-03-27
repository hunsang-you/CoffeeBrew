import { ReactComponent as Acidity } from '../../assets/coffeecard/acidity.svg';
import { ReactComponent as Bitterness } from '../../assets/coffeecard/bitterness.svg';
import { ReactComponent as Body } from '../../assets/coffeecard/body.svg';
import { ReactComponent as Flavor } from '../../assets/coffeecard/flavor.svg';
import { ReactComponent as Sweetness } from '../../assets/coffeecard/sweetness.svg';

const CoffeeCard = () => {
  const apidate: string = '';
  if (apidate === 'acidity') {
    return <Acidity />;
  } else if (apidate === '') {
    return <Bitterness />;
  } else if (apidate === '') {
    return <Body />;
  } else if (apidate === '') {
    return <Flavor />;
  } else if (apidate === '') {
    return <Sweetness />;
  } else {
    return <Sweetness />;
  }
};

export default CoffeeCard;
