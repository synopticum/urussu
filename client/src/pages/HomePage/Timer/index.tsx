import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import TimerState from 'src/pages/HomePage/Timer/state';
import { autorun } from 'mobx';
import l from './locale';

type Props = {};

const Timer: React.FC<Props> = observer(() => {
  const [timer] = useState(() => new TimerState());

  useEffect(
    () =>
      autorun(() => {
        // if (timer.secondsPassed > 4) alert("Still there. It's a minute already?!!");
      }),
    [],
  );

  useEffect(() => {
    const handle = setInterval(() => timer.increaseTimer(), 1000);
    return (): void => clearInterval(handle);
  }, []);

  return (
    <div>
      <div>
        {l('Секунд прошло')}: {timer.secondsPassed}
      </div>
      <div>{timer.secondPassedComputed}</div>
    </div>
  );
});

export default Timer;
