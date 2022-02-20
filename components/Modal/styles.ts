import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(4px);
  z-index: 99;
  opacity: 1;

  // fallback for Firefox
  @supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 0;
  padding-top: 40px;
  padding-bottom: 40px;

  & {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledModal = styled.div`
  width: 305px;

  @media (min-width: 425px) {
    width: 400px;
  }

  height: auto;

  /* padding: 15px; */
  background-color: white;

  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin: 0 auto;
  position: relative;
`;

export const ModalTitle = styled.div`
  /* flex: 0 0 auto;
	margin: 0; */

  font-weight: 500;
  padding-bottom: 15px;
`;

export const ModalContent = styled.div`
  flex: 1 0 auto;
  padding: 15px;
	position: relative;
  /* overflow-y: auto; */

  .modal-text {
    font-weight: 400;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  /* align-items: center; */
  flex: 0 1 auto;
  width: 100%;


  button:not(:first-of-type) {
    border-left: 1px solid #eee;
		border-bottom-right-radius: 5px;
	}

	button:first-of-type {
		border-bottom-left-radius: 5px;
	}

  /* .btn-modal-close {
    color: #f44336;
		background-color: transparent;

		&:hover {
			background-color: rgba(244, 67, 54, .5);
			color: #fff;
		}
  } */

  button {
		border-radius: 0;
		width: 100%;
    height: 45px;
  }

  /* button {
		min-width: 96px;
		width: 96px;
		padding: 2px 16px !important;
		text-transform: uppercase;
	}

	button:first-child:hover {
		text-decoration: underline;
	} */
`;
