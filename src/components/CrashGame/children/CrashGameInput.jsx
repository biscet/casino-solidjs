import { splitProps, Show } from 'solid-js';
import { useUnit } from 'effector-solid';
import { changeNumberStoreValue } from 'src/lib/effector-helper';
import {
  setLockValueFn,
  $betInputsData,
  $lockAllInputs,
} from 'src/models/Games/CrashGame/index';
import { LockSVG } from 'src/images/index';
import { INPUT_NAMES } from 'src/dict/fields';

const CrashGameInput = (props) => {
  const [{ inputOnChange, changeField, lockField, title, type }] =
    splitProps(props);

  const [betInputsData, lockAllInputs] = useUnit([
    $betInputsData,
    $lockAllInputs,
  ]);

  const lockButtonClick = () => {
    if (!lockAllInputs()) {
      setLockValueFn(lockField);
    }
  };

  return (
    <div class="container-wrapper__space-between">
      <div class="container-wrapper__input-title">{title}</div>

      <div class="container-wrapper__input-box">
        <Show when={type === INPUT_NAMES.TAKE_BET}>
          <div
            classList={{
              'lock-svg': true,
              'lock-svg_disable': lockAllInputs() || betInputsData()[lockField],
            }}
            onClick={lockButtonClick}
          >
            <LockSVG />
          </div>
        </Show>

        <input
          class="container-wrapper__input"
          type="text"
          id={changeField}
          name={changeField}
          value={betInputsData()[changeField]}
          onInput={changeNumberStoreValue(inputOnChange)}
          disabled={
            (lockAllInputs() && type === INPUT_NAMES.TAKE_BET) ||
            betInputsData()[lockField]
          }
        />
      </div>
    </div>
  );
};

export default CrashGameInput;
