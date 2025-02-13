import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 35px;
    height: 80px;
    position: relative;
  }
  .loader:after {
    content: "";
    position: absolute;
    inset: 0;
    padding: 3px 5px;
    border-top: 1px solid #bbb6aa;
    border-bottom: 4px solid #bbb6aa;
    background:
      linear-gradient(#77d4d4 0 0) bottom no-repeat content-box,
      #e4e0d7;
    mix-blend-mode: darken;
    animation: drink 1.5s infinite linear;
  }
  .loader:before {
    content: "";
    position: absolute;
    inset: -18px calc(50% - 2px) 8px;
    background: #eb6b3e;
    transform-origin: bottom;
    transform: rotate(8deg);
  }
  @keyframes drink {
    0% {
      background-size: 100% 100%;
    }
    100% {
      background-size: 100% 5%;
    }
  }`;

export default Loader;
