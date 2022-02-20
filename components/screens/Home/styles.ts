import styled from "styled-components";

export const QuizContainer = styled.div<{opacity: string}>`
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;

  .ani::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, calc(${props => props.opacity} / 100));
  }

  .vs {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 50px;
    width: 50px;
    z-index: 10;
    display: table;
    text-transform: uppercase;
    overflow: hidden;
    transform: translate(-50%, -50%);

    div:first-child {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      color: #000;
      font-size: 1.5rem;
      font-weight: bold;
    }

    svg {
      display: flex;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;