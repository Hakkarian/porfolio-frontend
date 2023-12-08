import styled from "@emotion/styled";

export const ContCss = styled.div`
box-sizing: border-box;
transition: all 0.15s ease-out 0s;

  .content {
    position: relative;
    width: calc(1rem * 4);
    height: calc(1rem * 2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    display: none;
  }

  label[for="btn"] {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(450%, -50%);
    width: calc(1rem * 4);
    height: calc(1rem * 2);
    background: #616774;
    border-radius: 1rem;
    box-shadow: 0 0 calc(1rem / 50) calc(1rem / 50) #0006,
      0 -4px calc(1rem / 10) calc(1rem / 500) #000d,
      0 0px calc(1rem / 10) calc(1rem / 50) #fff8,
      0 -4px calc(1rem / 5) calc(1rem / 50) #000c;
  }

  .track {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    overflow: hidden;
  }

  .track:before {
    content: "";
    position: absolute;
    width: 200%;
    height: 100%;
    left: -100%;
    transition: all 0.15s ease-out 0s;
    background: linear-gradient(90deg, #269fe5 50%, #616774 50%);
    animation: move-color 3s ease 0s 1;
  }

  #btn:checked + label .track:before {
    left: 0%;
  }

  .thumb {
    position: absolute;
    width: calc(calc(1rem * 2) - calc(1rem / 5));
    height: calc(calc(1rem * 2) - calc(1rem / 5));
    top: calc(calc(1rem / 10) + calc(1rem / 200));
    left: calc(calc(1rem / 10) + calc(1rem / 100));
    background: radial-gradient(
        circle at 50% 45%,
        #fff0 67%,
        #85d7fbcc calc(67% + 5px)
      ),
      radial-gradient(circle at 50% 25%, #fff0 61%, #fff8 calc(67% + 5px)),
      radial-gradient(
        circle at 50% 25%,
        #fff0 calc(1rem / 1),
        #269fe5 100%
      ),
      radial-gradient(
        circle at 50% 50%,
        #fff calc(1rem / 5),
        #fff0 calc(1rem / 2.5),
        #c1e0f7 calc(1rem / 1.5)
      ),
      radial-gradient(circle at 45% 20%, #ffffff, #c1e0f7 calc(1rem / 1));
    border-radius: 1rem;
    box-shadow: 0 0 calc(1rem / 15) 0 #777 inset,
      0 0 calc(1rem / 10) calc(1rem / 50) #fff2,
      0 0 calc(1rem / 10) 0 #fff2;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    overflow: hidden;
    animation: move-thumb 3s ease 5s 1;

  }

  #btn:checked + label .thumb {
    left: calc(
      calc(100% - calc(calc(1rem * 2) - calc(1rem / 3))) -
        calc(calc(1rem / 10) + calc(1rem / 7))
    );
    box-shadow: 0 0 0 calc(1rem / 50) #0002,
      0 0 calc(1rem / 10) 0 #0008,
      0 0 calc(1rem / 5) 0 #269fe5 inset;
  }

  .thumb:before,
  .thumb:after {
    content: "";
    display: block;
    width: 150%;
    height: 55%;
    background: radial-gradient(
        circle at 50% 80%,
        #434343,
        #333 calc(1rem / 1.55),
        #fff0 calc(calc(1rem / 1.55) + 2px)
      ),
      #232529;
    position: absolute;
    z-index:
    border-radius: 100%;
    top: -5%;
    transition: all 0.15s ease-out 0s;
    transform: scaleY(0.9);
    animation: move-eyelid-top 3s ease 0s 1;
    filter: drop-shadow(0px 2px 2px #000);

  }

  .thumb:before {
    &:hover, &:focus {
      top: -55%;
    }
  }

  .thumb:after {
    top: 50%;
    background: radial-gradient(
      circle at 50% -130%,
      #fff0 calc(1rem / 0.65),
      #212121 calc(1rem / 0.64),
      #444 calc(1rem / 0.45)
    );
    border-radius: 0;
    animation-name: move-eyelid-bot;
    filter: drop-shadow(0px -2px 2px #000c);

    &:hover, &:focus {
      top: 100%;
    }
  }

  #btn:checked + label .thumb:before {
    top: -55%;
  }
  #btn:checked + label .thumb:after {
    top: 100%;
  }

  .eye {
    position: absolute;
    width: calc(1rem / 3);
    height: calc(1rem / 3.1);
    background: radial-gradient(
      circle at 36% 35%,
      #8d8d8d 1px,
      #000 calc(1rem / 8),
      #269fe5
    );
    z-index: -2;
    border-radius: 100%;
    top: calc(1rem / 1.4);
    left: calc(1rem / 3.5);
    filter: blur(0.5px);
    animation: move-eye 3s ease 0s 1;

    }
  }

  #btn:checked + label .thumb .eye {
    top: calc(1rem / 2.25);
    left: calc(1rem / 0.825);
  }

  span.eye:before {
    content: "";
    position: absolute;
    width: calc(1rem / 2.5);
    height: calc(1rem / 2.5);
    border: calc(1rem / 2.5) solid #fff0;
    border-top: calc(1rem / 2.5) solid #fffc;
    border-right: calc(1rem / 2.5) solid #fffc;
    left: calc(1rem * -1);
    top: calc(1rem * -0.29);
    border-radius: 100%;
    transform: rotate(-87deg);
    filter: blur(7px);
  }

  /* initial animation */
  @keyframes move-thumb {
    0%,
    20%,
    80%,
    100% {
      left: calc(calc(1rem / 10) + calc(1rem / 100));
      box-shadow: 0 0 calc(1rem / 15) 0 #777 inset,
        0 0 calc(1rem / 10) calc(1rem / 50) #fff2,
        0 0 calc(1rem / 10) 0 #fff2;
    }
  }


  @keyframes move-eye {
    0%,
    20%,
    80%,
    100% {
      top: calc(1rem / 1.4);
      left: calc(1rem / 3.5);
    }
    30%,
    70% {
      top: calc(1rem / 2.25);
      left: calc(1rem / 0.825);
    }
  }

  @keyframes move-eyelid-top {
    0%,
    20%,
    80%,
    100% {
      top: -5%;
    }
    30%,
    70% {
      top: -55%;
    }
  }

  @keyframes move-eyelid-bot {
    0%,
    20%,
    80%,
    100% {
      top: 50%;
    }
    30%,
    70% {
      top: 100%;
    }
  }
`;