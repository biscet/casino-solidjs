import { useUnit } from 'effector-solid';
import { $playerCombineData } from 'src/models/Player/index';

const CrashGameStats = () => {
  const playerCombineData = useUnit($playerCombineData);

  return (
    <div class="stats-wrapper">
      <div>Your stats</div>

      <div class="stats-wrapper__stats">
        <p class="bets">Bets: {playerCombineData().bets}</p>
        <p class="money">Money: {playerCombineData().money}$</p>
      </div>
    </div>
  );
};

export default CrashGameStats;
