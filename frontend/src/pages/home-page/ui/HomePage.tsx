import cn from 'classnames';
import classes from './styles.module.scss';
import { BalanceCard } from '../../../shared/ui/balance-card/BalanceCard';
import { FruitClicker } from '../../../shared/ui/fruit-clicker';
import { ProgressBar } from '../../../shared/ui/progress-bar/ProgressBar';
import { useEffect, useState } from 'react';
import { Click } from '../../../shared/ui/click';
import { createSocket, fetchInitialData, postData } from '../api/api';
import { useInitData } from '@telegram-apps/sdk-react';

export const HomePage: React.FC = () => {
  const initData = useInitData();
  const [currentEnergy, setCurrentEnergy] = useState(0);
  const [maxEnergy] = useState(1000);
  const [pointsToAdd] = useState(1);
  const [balance, setBalance] = useState(0);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [coinsSocket, setCoinsSocket] = useState<WebSocket | null>(null);
  const [energySocket, setEnergySocket] = useState<WebSocket | null>(null);

  const handleFruitClick = (e: React.TouchEvent<HTMLImageElement>) => {
    coinsSocket?.send(JSON.stringify({ coins: `${balance + pointsToAdd}` }));
    energySocket?.send(JSON.stringify({ energy: `${currentEnergy - pointsToAdd}` }));
    const card = e.currentTarget;
    card.style.transform = `scale(0.98)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);
    setCurrentEnergy(prev => prev - pointsToAdd);
    setBalance(prev => prev + pointsToAdd);
    Array.from(e.changedTouches).forEach(item => {
      setClicks(prev => [...prev, { id: Date.now(), x: item.pageX, y: item.pageY }]);
    })
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  useEffect(() => {
    if (initData && initData.user) {
      const userRows = initData.user
      fetchInitialData(userRows.id)
        .then((res) => {
          const { energy, coins } = res.data
          setCurrentEnergy(energy);
          setBalance(coins);
          window.addEventListener('pagehide', () => {
            postData(userRows.id, balance, currentEnergy)
              .catch(err => console.log(err))
          })
        })
        .catch(err => console.log(err));

      setCoinsSocket(createSocket(userRows.id, 'coins_gain'));
      setEnergySocket(createSocket(userRows.id, 'energy_gain'));

      return () => window.removeEventListener('pagehide', () => {
        postData(userRows.id, balance, currentEnergy)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err))
      })
    }
  }, [initData]);

  useEffect(() => {
    if (currentEnergy < maxEnergy) {
      const interval = setInterval(() => {
        setCurrentEnergy(prev => prev + 1);
      }, 1000)
      return () => clearInterval(interval);
    }
  }, [maxEnergy, currentEnergy, energySocket]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + pointsToAdd);
    }, 1000)
    return () => clearInterval(interval);
  }, [coinsSocket, balance, pointsToAdd]);

  return (
    <main className={cn(classes.wrapper)}>
      <div className={cn(classes['balance-card-wrapper'])}>
        <BalanceCard value={balance} />
      </div>
      <div className={cn(classes['fruit-button-wrapper'])}>
        <FruitClicker handleClick={currentEnergy - pointsToAdd >= 0 ? handleFruitClick : () => {}} />
      </div>
      <div className={cn(classes['balance-card-wrapper'])}>
        <ProgressBar currentEnergy={currentEnergy} maxEnergy={maxEnergy} />
      </div>
      {clicks.map(item => 
        <Click handleAnimationEnd={handleAnimationEnd} clickSettings={item} key={item.id} value={1} />
      )}
    </main>
  )
}