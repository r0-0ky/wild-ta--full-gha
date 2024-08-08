import classes from './styles.module.scss';
import cn from 'classnames';
import { FruitClickerProps } from './types';
import Fruit from '../../images/for-fruit-clicker/fruit.png'

export const FruitClicker: React.FC<FruitClickerProps> = ({ handleClick }) => {
  return (
    <img onTouchStart={handleClick} className={cn(classes['fruit-button'])} src={Fruit} alt="fruit" />
  )
}