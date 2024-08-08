import cn from 'classnames';
import classes from './styles.module.scss';
import { ClickProps } from './types';
import OrangeClick from '../../images/for-click/orange-click.svg';
import PurpleClick from '../../images/for-click/purple-click.svg';
import { useEffect, useState } from 'react';

export const Click: React.FC<ClickProps> = ({ clickSettings, handleAnimationEnd, value }) => {
  const [currentImageClick, setCurrentImageClick] = useState(OrangeClick);
  useEffect(() => {
    setCurrentImageClick([PurpleClick, OrangeClick][Math.floor(Math.random() * 2)])
  }, [clickSettings.id]);
  return (
    <div
      className={cn(classes['click'])}
      style={{
        top: `${clickSettings.y - 42}px`,
        left: `${clickSettings.x - 28}px`,
        background: `url(${currentImageClick}) center / contain no-repeat`,
      }}
      onAnimationEnd={() => handleAnimationEnd(clickSettings.id)}
    >
      +{value}
    </div>
  )
}