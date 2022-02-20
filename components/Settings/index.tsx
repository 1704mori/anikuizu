import Slider, { SliderTooltip } from "rc-slider";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useLocale } from "../../hooks/useLocale";
import Modal from "../Modal";

interface Props {
  setOpenSettings: Function;
  openSettings: boolean;
}

const { Handle } = Slider;

const handle = (props: any) => {
  const { value, dragging, type, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} ${type}`}
      visible={dragging}
      placement="top"
      zIndex={100}
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

export default function Settings(props: Props) {
  const { setOpenSettings, openSettings } = props;

  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(0.5);
  const { t } = useLocale();
  const { keepPreviousQuestion, setKeepPreviousQuestion } =
    useContext(GlobalContext);

  function submitSettings() {
    setOpenSettings(false);
  }

  function handleChangeSettings(key: string, value: any) {
    localStorage.setItem(key, String(value));

    if (key === "overlayOpacity") {
      setOverlayOpacity(value);
    }

    if (key === "animationSpeed") {
      setAnimationSpeed(value);
    }

    if (key === "keepPreviousQuestion") {
      setKeepPreviousQuestion(value);
    }
  }

  useEffect(() => {
    setOverlayOpacity(
      parseFloat(localStorage.getItem("overlayOpacity") || "80")
    );
    setAnimationSpeed(
      parseFloat(localStorage.getItem("animationSpeed") || "600")
    );
    setKeepPreviousQuestion(
      (localStorage.getItem("keepPreviousQuestion") as string) === "true"
        ? true
        : false
    );
  }, []);

  return (
    <Modal
      hide={() => setOpenSettings(false)}
      visible={openSettings}
      title={t.modal.title}
      onSave={submitSettings}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col relative">
          <div className="text-black font-medium">{t.modal.quizDelay}</div>
          <Slider
            min={100}
            max={1000}
            defaultValue={animationSpeed}
            trackStyle={{
              backgroundColor: "#2e51a2",
            }}
            handleStyle={{
              borderColor: "#2e51a2",
            }}
            handle={(props) => handle({ ...props, type: "ms" })}
            onAfterChange={(value) =>
              handleChangeSettings("animationSpeed", value)
            }
          />
        </div>
        <div className="flex flex-col relative">
          <div className="text-black font-medium">{t.modal.overlayOpacity}</div>
          <Slider
            min={10}
            max={100}
            defaultValue={overlayOpacity}
            trackStyle={{
              backgroundColor: "#2e51a2",
            }}
            handleStyle={{
              borderColor: "#2e51a2",
            }}
            handle={(props) => handle({ ...props, type: "%" })}
            onAfterChange={(value) =>
              handleChangeSettings("overlayOpacity", value)
            }
          />
        </div>
        <div className="flex items-center relative">
          <div className="text-black font-medium mr-2">
            {t.modal.keepPreviousQuestion}
          </div>
          <input
            type="checkbox"
            color="#2e51a2"
            checked={keepPreviousQuestion}
            onChange={(e) =>
              handleChangeSettings("keepPreviousQuestion", e.target.checked)
            }
          />
        </div>
      </div>
    </Modal>
  );
}
