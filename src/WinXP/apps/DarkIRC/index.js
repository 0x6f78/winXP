import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

function Cmd() {
  const asciiArt = [
    '  ██████╗  █████╗ ██████╗ ██╗  ██╗   ██║██████╗ ██║████╗',
    '  ██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝   ██║██╔══██╗██╔════╝',
    '  ██║  ██║███████║██████╔╝█████╔╝    ██║██████╔╝██║     ',
    '  ██║  ██║██╔══██║██╔══██╗██╔═██╗    ██║██╔══██╗██║     ',
    '  ██████╔╝██║  ██║██║  ██║██║  ██╗██║██║██║  ██║██║█████╗',
    '  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝╚═╝  ╚═╝╚═╝╚════╝',
    '==========================================================',
    '*** Welcome to #general ***',
    '*** You are known as @millkie ***',
    '----------------------------------------------------------',
  ];

  const allMessages = [
    {
      time: '12:01:23',
      user: '!AutoMessage',
      text: 'System booting… Good morning, netrunners.',
    },
    {
      time: '12:01:35',
      user: 'Shadow_DropBear',
      text: 'Yo @millkie! You online for the raid tonight?',
    },
    {
      time: '12:02:01',
      user: '@millkie',
      text: 'All set. Anyone up for some games later on??',
    },
    // ... rest of messages
  ];

  const channels = [
    '#general',
    '#gaming',
    '#random',
    '#music',
    '#tech',
    '#memes',
  ];

  const users = [
    '@millkie',
    '!AutoMessage',
    'AlexJ',
    'Vex',
    'BunnieHex',
    'BreadPirate',
    'ByteCaster',
    'Cipherling',
    'Gl1tchiN7',
    'Mell0wH4x',
    'HoneySprout',
    'JuneBug',
    'SnipaXMR',
    'MellowMike',
    'MintyMochi',
    'NightReaper',
    'N3onPulse',
    'PeachyPaws',
    'T0r1Crypt',
    'Shadow_DropBear',
    'SoftCloud',
    'SolitudeRaven',
    'SpicyNugget',
    'SparkleFawn',
    'daHex',
    'ToriWrites',
    'VoidWhisper',
  ].sort((a, b) =>
    a === '@millkie' ? -1 : b === '@millkie' ? 1 : a.localeCompare(b),
  );

  const [displayedMessages, setDisplayedMessages] = useState([]);
  const bottomRef = useRef(null);

  const [leftWidth, setLeftWidth] = useState(150); // slightly bigger
  const [rightWidth, setRightWidth] = useState(180); // wider right column
  const [dragging, setDragging] = useState(null);
  const dragOffset = useRef(0);

  // Gradually append messages
  useEffect(() => {
    let index = 0;
    const showNextMessage = () => {
      if (index < allMessages.length) {
        setDisplayedMessages(prev => [...prev, allMessages[index]]);
        index++;
        const delay = Math.random() * 3000 + 3000;
        setTimeout(showNextMessage, delay);
      }
    };
    showNextMessage();
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages]);

  // Mouse events for resizing
  useEffect(() => {
    const handleMouseMove = e => {
      if (dragging === 'left') {
        let newWidth = e.clientX - dragOffset.current;
        setLeftWidth(Math.max(100, newWidth));
      }
      if (dragging === 'right') {
        let newWidth = window.innerWidth - e.clientX - dragOffset.current;
        setRightWidth(Math.max(100, newWidth));
      }
    };
    const handleMouseUp = () => setDragging(null);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <CmdWindow>
      <MainContainer>
        <LeftPane style={{ width: leftWidth }}>
          {channels.map((ch, i) => (
            <Channel key={i} active={ch === '#general'}>
              {ch}
            </Channel>
          ))}
          <DragHandle
            onMouseDown={e => {
              setDragging('left');
              dragOffset.current = e.clientX - leftWidth;
            }}
          />
        </LeftPane>

        <MiddlePane>
          <ChatScroll>
            <ChatInner>
              {asciiArt.map((line, i) => (
                <Line key={i} green>
                  {line}
                </Line>
              ))}
              {displayedMessages.map((msg, i) => (
                <Line key={i}>
                  <Timestamp>&lt;{msg.time}&gt;</Timestamp>{' '}
                  <UserName
                    me={msg.user === '@millkie'}
                    red={msg.user === '!AutoMessage'}
                  >
                    {msg.user}
                  </UserName>
                  : <Text>{msg.text}</Text>
                </Line>
              ))}
              <div ref={bottomRef} />
            </ChatInner>
          </ChatScroll>
          <InputBox>
            <BlinkingCursor />
          </InputBox>
        </MiddlePane>

        <RightPane style={{ width: rightWidth }}>
          {users.map((u, i) => (
            <User key={i} me={u === '@millkie'} red={u === '!AutoMessage'}>
              {u}
            </User>
          ))}
          <DragHandle
            right
            onMouseDown={e => {
              setDragging('right');
              dragOffset.current = window.innerWidth - e.clientX - rightWidth;
            }}
          />
        </RightPane>
      </MainContainer>
    </CmdWindow>
  );
}

//
// STYLES
//
const CmdWindow = styled.div`
  background: #000;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: clamp(0.5rem, 1.2vw, 1rem);
  height: 100%;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
`;

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  min-width: 0;
`;

const LeftPane = styled.div`
  border-right: 2px solid #fff;
  padding-right: 10px;
  min-width: 0;
  overflow-y: auto; /* Only shows scrollbar if content overflows */
  overflow-x: hidden;
  position: relative;
`;

const MiddlePane = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  min-width: 0;
  border-right: 2px solid #fff;
  overflow: hidden;
`;

const ChatScroll = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightPane = styled.div`
  padding-left: 10px;
  min-width: 0;
  overflow-y: auto;
  position: relative;
`;

const Line = styled.div`
  white-space: pre-wrap;
  color: ${props => (props.green ? '#00ff00' : '#ffffff')};
`;

const Timestamp = styled.span`
  color: #ffffff;
`;

const UserName = styled.span`
  font-weight: bold;
  color: ${props => (props.me ? '#ff69b4' : props.red ? '#ff3300' : '#00ff00')};
`;

const User = styled.div`
  margin-bottom: 6px;
  font-weight: bold;
  color: ${props => (props.me ? '#ff69b4' : props.red ? '#ff3300' : '#00ff00')};
`;

const Text = styled.span`
  color: #ffffff;
`;

const Channel = styled.div`
  margin-bottom: 8px;
  font-weight: bold;
  color: ${props => (props.active ? '#ffffff' : '#00ff00')};
`;

const Blinking = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const InputBox = styled.div`
  height: 1.5em;
  border: 2px solid #fff;
  margin-top: 5px;
  padding: 2px 5px;
  display: flex;
  align-items: center;
`;

const BlinkingCursor = styled.div`
  width: 10px;
  height: 100%;
  background: #00ff00;
  animation: ${Blinking} 1s step-start infinite;
`;

const DragHandle = styled.div`
  position: absolute;
  top: 0;
  ${props => (props.right ? 'left: -5px;' : 'right: -5px;')}
  width: 10px;
  height: 100%;
  cursor: ew-resize;
  z-index: 10;
`;

export default Cmd;
