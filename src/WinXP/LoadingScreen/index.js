import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

function LoadingScreen({ onLoadComplete }) {
  const [currentBlock, setCurrentBlock] = useState(0);

  useEffect(() => {
    // Animate the blocks moving left to right
    const interval = setInterval(() => {
      setCurrentBlock(prev => (prev + 1) % 3);
    }, 200);

    // Complete loading after 3.5 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setTimeout(() => {
        onLoadComplete && onLoadComplete();
      }, 100);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onLoadComplete]);

  return (
    <Container>
      <Content>
        <LogoSection>
          {/* Windows Flag Logo */}
          <WindowsFlag>
            <FlagRow>
              <FlagSquare className="red" />
              <FlagSquare className="green" />
            </FlagRow>
            <FlagRow>
              <FlagSquare className="blue" />
              <FlagSquare className="yellow" />
            </FlagRow>
          </WindowsFlag>

          {/* Windows XP Text */}
          <TextContainer>
            <MicrosoftText>
              Microsoft<sup>®</sup>
            </MicrosoftText>
            <WindowsText>
              <span className="windows">Windows</span>
              <span className="xp">XP</span>
            </WindowsText>
          </TextContainer>
        </LogoSection>

        {/* Loading Blocks */}
        <LoadingBar>
          <LoadingBlockContainer>
            <LoadingBlock $active={currentBlock === 0} />
            <LoadingBlock $active={currentBlock === 1} />
            <LoadingBlock $active={currentBlock === 2} />
          </LoadingBlockContainer>
        </LoadingBar>

        {/* Copyright Text */}
        <CopyrightText>©Microsoft Corporation</CopyrightText>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  font-family: 'Franklin Gothic', 'Arial', sans-serif;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
`;

const WindowsFlag = styled.div`
  width: 80px;
  height: 80px;
  perspective: 400px;
  transform: rotateY(-20deg);
`;

const FlagRow = styled.div`
  display: flex;
  height: 50%;
  gap: 4px;
  &:first-child {
    margin-bottom: 4px;
  }
`;

const FlagSquare = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 1px;

  &.red {
    background: linear-gradient(135deg, #f65314 0%, #e64100 100%);
  }

  &.green {
    background: linear-gradient(135deg, #7cbb00 0%, #5a8700 100%);
  }

  &.blue {
    background: linear-gradient(135deg, #00a1f1 0%, #0078d7 100%);
  }

  &.yellow {
    background: linear-gradient(135deg, #ffbb00 0%, #ff9900 100%);
  }
`;

const TextContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const MicrosoftText = styled.div`
  color: #c0c0c0;
  font-size: 13px;
  font-weight: normal;
  letter-spacing: 0.5px;
  margin-bottom: 2px;

  sup {
    font-size: 8px;
    vertical-align: super;
  }
`;

const WindowsText = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;

  .windows {
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -0.5px;
  }

  .xp {
    color: #ff5a00;
    font-size: 24px;
    font-weight: bold;
    font-style: italic;
    letter-spacing: -1px;
    margin-left: -2px;
  }
`;

const LoadingBar = styled.div`
  position: absolute;
  bottom: 35%;
  left: 50%;
  transform: translateX(-50%);
`;

const LoadingBlockContainer = styled.div`
  display: flex;
  gap: 3px;
  padding: 2px;
`;

const LoadingBlock = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 1px;
  background: ${props =>
    props.$active
      ? 'linear-gradient(90deg, #4a90d9 0%, #5fa0e9 50%, #4a90d9 100%)'
      : '#1a3a5a'};
  border: 1px solid ${props => (props.$active ? '#6ab0f9' : '#0a2a4a')};
  transition: all 0.2s ease;
  transform: scale(${props => (props.$active ? 1.1 : 1)});
  box-shadow: ${props =>
    props.$active
      ? '0 0 10px rgba(106, 176, 249, 0.8), inset 0 0 3px rgba(255, 255, 255, 0.3)'
      : 'none'};
`;

const CopyrightText = styled.div`
  position: absolute;
  bottom: 10%;
  color: #808080;
  font-size: 11px;
  letter-spacing: 0.3px;
  font-family: 'Tahoma', 'Arial', sans-serif;
`;

export default LoadingScreen;
