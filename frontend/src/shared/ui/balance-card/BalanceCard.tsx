import cn from 'classnames';
import classes from './styles.module.scss';
import { BalanceCardProps } from './types';

export const BalanceCard: React.FC<BalanceCardProps> = ({ value }) => {
  return (
    <div className={cn(classes.card)}>
      {value}
    </div>
  )
}