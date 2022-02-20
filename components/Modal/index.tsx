import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useLocale } from "../../hooks/useLocale";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Button from "../Button";
import {
  ModalContent,
  ModalTitle,
  StyledModal,
  ModalActions,
  Container,
  Content,
  Overlay,
} from "./styles";

interface ModalProps {
  visible: boolean;
  hide: any;
  title: string;
  children?: React.ReactNode;
  onSave: () => void;
}

const Dialog = (props: ModalProps): JSX.Element | null => {
  const containerRef = useRef(null);
  const { t } = useLocale();

  const { visible, hide, children, title, onSave } = props;

  useOnClickOutside(containerRef, () => {
    hide();
  });

  return (
    <CSSTransition
      in={visible}
      timeout={200}
      classNames="modal"
      unmountOnExit
      appear
    >
      <Overlay>
        <Container>
          <Content ref={containerRef}>
            <StyledModal>
              <ModalContent>
                <ModalTitle>
                  <div className="text-xl">{title}</div>
                </ModalTitle>

                <div className="modal-text relative">{children}</div>
              </ModalContent>
              <ModalActions>
                <Button className="btn-modal-close" onClick={hide}>
                  {t.modal.close}
                </Button>
                <Button onClick={onSave}>
                  {t.modal.save}
                </Button>
              </ModalActions>
            </StyledModal>
          </Content>
        </Container>
      </Overlay>
    </CSSTransition>
  );
};

export default Dialog;
