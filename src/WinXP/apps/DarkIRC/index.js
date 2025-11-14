import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

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
    { time: '12:01:23', user: '!AutoMessage', text: 'Morning all!' },
    {
      time: '12:01:35',
      user: 'Shadow_DropBear',
      text: 'Hi @millkie! How are you?',
    },
    {
      time: '12:02:01',
      user: '@millkie',
      text: 'Doing great, thanks! Anyone up for a game later?',
    },
    {
      time: '12:02:15',
      user: 'Sadaf_',
      text: 'L2 or CS1.3? Im down! Count me in!',
    },
    { time: '12:02:45', user: '!AutoMessage', text: 'Mee too, when home..' },
    {
      time: '12:03:12',
      user: 'Shadow_DropBear',
      text: 'Have you seen the latest leak?',
    },
    {
      time: '12:03:45',
      user: '@millkie',
      text: 'Yeah, it looks wild! Anyone seen it yet?',
    },
    {
      time: '12:04:05',
      user: 'Sadaf_',
      text: 'Not yet, gonna check it after work.',
    },
    {
      time: '12:04:30',
      user: 'Lil_Turnip',
      text: 'I can check and let you know if you want',
    },
    {
      time: '12:04:59',
      user: 'AshenSoul',
      text: 'Oh, and did you see the rumor about cross-realm parties?',
    },
    {
      time: '12:05:15',
      user: '@millkie',
      text: 'You mean the online / real life ones?',
    },
    {
      time: '12:05:20',
      user: 'AshenSoul',
      text: 'mhm, its like SecondLife but better.',
    },
  ];

  const users = [
    '@millkie',
    '!AutoMessage',
    'AlexJ',
    'AshenSoul',
    'BunnyBun',
    'BreadPirate',
    'ByteCaster',
    'Cipherling',
    'Gl1tchBerry',
    'GrandmaLaser',
    'HoneySprout',
    'JuneBug',
    'Lil_Turnip',
    'MellowMike',
    'MintyMochi',
    'NightReaper',
    'N3onPulse',
    'PeachyPaws',
    'SammyPlays',
    'Shadow_DropBear',
    'SoftCloud',
    'SolitudeRaven',
    'SpicyNugget',
    'SparkleFawn',
    'Sadaf_',
    'ToriWrites',
    'VoidWhisper',
  ].sort((a, b) =>
    a === '@millkie' ? -1 : b === '@millkie' ? 1 : a.localeCompare(b),
  );

  const [displayedMessages, setDisplayedMessages] = useState([]);
  const bottomRef = useRef(null);

  // ⭐ Append messages gradually
  useEffect(() => {
    let index = 0;

    const showNextMessage = () => {
      if (index < allMessages.length) {
        setDisplayedMessages(prev => [...prev, allMessages[index]]);
        index++;
        const delay = Math.random() * 3000 + 3000; // 3-6 seconds
        setTimeout(showNextMessage, delay);
      }
    };

    showNextMessage();
  }, []);

  // ⭐ Scroll chat to bottom automatically
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages]);

  return (
    <CmdWindow>
      <MainContainer>
        <LeftPane>
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
        </LeftPane>

        <RightPane>
          <Line green />
          {users.map((u, i) => (
            <User key={i} me={u === '@millkie'} red={u === '!AutoMessage'}>
              {u}
            </User>
          ))}
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
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  min-width: 0;
  overflow: hidden;
`;

const ChatScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  min-width: 0;
`;

const ChatInner = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 5px;
`;

const RightPane = styled.div`
  flex: 1;
  border-left: 2px solid #00ff00;
  padding-left: 10px;
  min-width: 0;
  overflow-y: auto;
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

export default Cmd;
