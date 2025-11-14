import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

function Cmd() {
  const asciiHeader = [
    '  ██████╗  █████╗ ██████╗ ██╗  ██╗   ██║██████╗ ██║████╗',
    '  ██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝   ██║██╔══██╗██╔════╝',
    '  ██║  ██║███████║██████╔╝█████╔╝    ██║██████╔╝██║     ',
    '  ██║  ██║██╔══██║██╔══██╗██╔═██╗    ██║██╔══██╗██║     ',
    '  ██████╔╝██║  ██║██║  ██║██║  ██╗██║██║██║  ██║██║█████╗',
    '  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝╚═╝  ╚═╝╚═╝╚════╝',
    '==================================================================',
    '*** Welcome to #general ***',
    '*** You are known as @millkie ***',
    '------------------------------------------------------------------',
  ];

  const messages = [
    { time: '12:01:23', user: 'AutoMessage', text: 'Hello everyone!' },
    { time: '12:01:35', user: 'ShadowBear', text: 'Hi @millkie! How are you?' },
    {
      time: '12:02:01',
      user: '@millkie',
      text: 'Doing great, thanks! Anyone up for a game later?',
    },
    { time: '12:02:15', user: 'Charlie', text: 'Count me in!' },
    { time: '12:02:45', user: 'AutoMessage', text: 'Same here 🙂' },
  ];

  const users = ['@millkie', 'AutoMessage', 'ShadowBear', 'Charlie'];
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <CmdWindow>
      <MainContainer>
        <LeftPane>
          <HeaderSection>
            {asciiHeader.map((line, i) => (
              <Line key={i} white>
                {line}
              </Line>
            ))}
          </HeaderSection>

          <ChatScroll>
            <ChatInner>
              {messages.map((msg, i) => (
                <Line key={i}>
                  <Timestamp>&lt;{msg.time}&gt;</Timestamp>{' '}
                  <UserName me={msg.user === '@millkie'}>{msg.user}</UserName>:{' '}
                  <Text>{msg.text}</Text>
                </Line>
              ))}
              <div ref={bottomRef} />
            </ChatInner>
          </ChatScroll>
        </LeftPane>

        <RightPane>
          <Line green />
          {users.map((u, i) => (
            <User key={i} me={u === '@millkie'}>
              {u}
            </User>
          ))}
        </RightPane>
      </MainContainer>
    </CmdWindow>
  );
}

//
// STYLES (RESPONSIVE)
//
const CmdWindow = styled.div`
  background: #000;
  color: #00ff00;
  font-family: 'Courier New', monospace;

  /* ⭐ Responsive scaling */
  font-size: clamp(0.5rem, 1.2vw, 1rem);

  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  min-width: 0; /* ⭐ allow flex shrink */
`;

const LeftPane = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  min-width: 0; /* ⭐ prevent overflow */
`;

const HeaderSection = styled.div`
  margin-bottom: 10px;
  white-space: pre-wrap; /* ⭐ responsive ASCII */
  word-break: break-word;
`;

const ChatScroll = styled.div`
  flex: 1;
  display: flex;
  overflow-y: hidden;
  position: relative;
  min-width: 0;
`;

const ChatInner = styled.div`
  margin-top: auto;
  overflow-y: auto;
  padding-right: 5px;
`;

const RightPane = styled.div`
  flex: 1;
  border-left: 2px solid #00ff00;
  padding-left: 10px;
  min-width: 0;
`;

const Line = styled.div`
  white-space: pre-wrap;
  color: ${props =>
    props.green ? '#00ff00' : props.white ? '#ffffff' : '#ffffff'};
`;

const Timestamp = styled.span`
  color: #ffffff;
`;

const UserName = styled.span`
  font-weight: bold;
  color: ${props => (props.me ? '#ff69b4' : '#00ff00')};
`;

const User = styled.div`
  margin-bottom: 6px;
  font-weight: bold;
  color: ${props => (props.me ? '#ff69b4' : '#00ff00')};
`;

const Text = styled.span`
  color: #ffffff;
`;

export default Cmd;
