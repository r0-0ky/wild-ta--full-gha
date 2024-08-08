import classes from './styles.module.scss';
import cn from 'classnames';
import { ProgressBarProps, ProgressBarStyle } from './types';
import { useEffect, useState } from 'react';


export const ProgressBar: React.FC<ProgressBarProps> = ({ maxEnergy, currentEnergy }) => {
  const [percentage, stePercentage] = useState(+(currentEnergy / (maxEnergy / 100)).toFixed(2));

  useEffect(() => {
    stePercentage(+(currentEnergy / (maxEnergy / 100)).toFixed(2))
  }, [currentEnergy, maxEnergy]);

  return (
    <div>
      <div className={cn(classes['container'])}>
        <p className={cn(classes['progress-bar-text'])}>Berry</p>
        <p className={cn(classes['progress-bar-pink-text'])}>{percentage}%</p>
      </div>
      <div className={cn(classes['progress-bar-container'])}>
        <div className={cn(classes['progress-bar-loader'])} style={{ '--a': `${100 - percentage}%`} as ProgressBarStyle}></div>
        <span className={cn(classes['progress-bar-bold-text'])}>Grape</span>
      </div>
      <div className={cn(classes['container'])}>
        <p className={cn(classes['progress-bar-text'])}>{currentEnergy}<span className={cn(classes['progress-bar-pink-text'])}> ({maxEnergy})</span></p>
        <p className={cn(classes['progress-bar-text'])}>{maxEnergy}</p>
      </div>
    </div>
  )
}