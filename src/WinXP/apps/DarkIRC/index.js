import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useWindowSize from 'react-use/lib/useWindowSize';

function Cmd() {
  const asciiArtDesktop = [
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

  const asciiArtMobile = [
    '===== DarkIRC =====',
    '*** #general ***',
    '*** @millkie ***',
    '-------------------',
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
    {
      time: '12:02:15',
      user: 'daHex',
      text: 'L2 or CS1.3? I’m logging in. Count me.',
    },
    {
      time: '12:02:45',
      user: '!AutoMessage',
      text: 'Me too, after work, soon...',
    },
    {
      time: '12:03:12',
      user: 'Shadow_DropBear',
      text: 'Seen the latest leaks??????',
    },
    {
      time: '12:03:45',
      user: '@millkie',
      text: 'Yeah… the visuals are insane. Anyone else peeked it?',
    },
    {
      time: '12:04:05',
      user: 'daHex',
      text: 'Not yet, syncing my rig. Will check later.',
    },
    {
      time: '12:04:30',
      user: 'SnipaXMR',
      text: 'I can stream it if you want, or record something.',
    },
    {
      time: '12:04:59',
      user: 'Vex',
      text: 'Wait are you talking about the new cross-realm raves?',
    },
    {
      time: '12:05:15',
      user: '@millkie',
      text: 'Those fully virtual ones, right? 3D worlds?',
    },
    {
      time: '12:05:20',
      user: 'Vex',
      text:
        'Exactly. Fully immersive, avatars moving, hundreds of people synced.',
    },
    {
      time: '12:05:45',
      user: 'SnipaXMR',
      text: 'Wait… you mean real-time motion, 3D lights, DJ streams?',
    },
    {
      time: '12:06:02',
      user: 'Vex',
      text:
        'Yep. Think cyber-clubs with live sets, neon strobes, avatars grooving.',
    },
    {
      time: '12:06:25',
      user: '@millkie',
      text: 'This is wild. Actual DJs streaming in real-time?',
    },
    {
      time: '12:06:42',
      user: 'Vex',
      text:
        'Exactly. Some stages have 50+ avatars, dancing, chatting, even mini-games.',
    },
    {
      time: '12:07:05',
      user: 'daHex',
      text: 'All interactive? Full-on party in cyberspace?',
    },
    {
      time: '12:07:23',
      user: 'Vex',
      text:
        'Yes. You can wander lounges, rooftop areas, multiple stages, fully 3D.',
    },
    {
      time: '12:07:50',
      user: 'SnipaXMR',
      text: 'Next-level immersion… feels like the future of social hacking.',
    },
    {
      time: '12:08:10',
      user: 'Vex',
      text:
        'It’s literally cross-realm. Worlds merged. Avatars, lights, music… total immersion.',
    },
    {
      time: '12:08:30',
      user: '@millkie',
      text: 'Sign me up. We need our crew in there.',
    },
    {
      time: '12:08:50',
      user: 'daHex',
      text: 'Imagine all our handles in the same 3D space. Mind blown.',
    },
    {
      time: '12:09:12',
      user: 'Shadow_DropBear',
      text: 'VR mode coming soon too. You could dance like a ghost in shell.',
    },
    {
      time: '12:09:35',
      user: 'Vex',
      text: 'Cross-realm, fully 3D, live DJs, mini-games… this shit is wild.',
    },

    // New added messages, cleaned
    {
      time: '12:09:50',
      user: 'Cipherling',
      text: 'Anyone tried glitching the avatar physics yet?',
    },
    {
      time: '12:10:12',
      user: 'SnipaXMR',
      text: 'Some hacks are wild… avatars reacting unpredictably.',
    },
    {
      time: '12:10:33',
      user: 'Vex',
      text:
        'Careful, they’re patching exploits every week. Admins are on high alert.',
    },
    {
      time: '12:10:50',
      user: 'daHex',
      text: 'Gonna script a little bot to track parties tonight.',
    },
    {
      time: '12:11:52',
      user: 'Vex',
      text: 'Lol, this crew turns parties into a full cyber-adventure.',
    },
    {
      time: '12:12:15',
      user: 'SnipaXMR',
      text: 'Virtual dance-off challenge? Avatars only, no cheating.',
    },
    {
      time: '12:12:40',
      user: '@millkie',
      text: 'Challenge accepted. Gonna wiggle my ass as usual.',
    },
    {
      time: '12:13:20',
      user: 'Vex',
      text: 'Imagine all this while live DJs mixing. Pure chaos.',
    },
    {
      time: '12:13:45',
      user: 'daHex',
      text: 'We should record this. Archive the cyber-party for posterity.',
    },
    {
      time: '12:14:00',
      user: 'T0r1Crypt',
      text: 'Already logging every move. Ghost traces, fully encrypted.',
    },
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
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 768;

  const [leftWidth, setLeftWidth] = useState(150); // slightly bigger
  const [rightWidth, setRightWidth] = useState(180); // wider right column
  const [dragging, setDragging] = useState(null);
  const dragOffset = useRef(0);
  const [mobileView, setMobileView] = useState('chat'); // 'chat', 'channels', 'users'

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
    // Use scrollTop instead of scrollIntoView to prevent viewport shifting on mobile
    const scrollContainer = bottomRef.current?.parentElement?.parentElement;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [displayedMessages]);

  // Mouse events for resizing
  useEffect(() => {
    const handleMouseMove = e => {
      if (!isMobile && dragging === 'left') {
        let newWidth = e.clientX - dragOffset.current;
        setLeftWidth(Math.max(100, newWidth));
      }
      if (!isMobile && dragging === 'right') {
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
  }, [dragging, isMobile]);

  return (
    <CmdWindow>
      {isMobile && (
        <MobileNav>
          <MobileNavButton
            active={mobileView === 'channels'}
            onClick={() => setMobileView('channels')}
          >
            Channels
          </MobileNavButton>
          <MobileNavButton
            active={mobileView === 'chat'}
            onClick={() => setMobileView('chat')}
          >
            Chat
          </MobileNavButton>
          <MobileNavButton
            active={mobileView === 'users'}
            onClick={() => setMobileView('users')}
          >
            Users ({users.length})
          </MobileNavButton>
        </MobileNav>
      )}
      <MainContainer isMobile={isMobile}>
        <LeftPane
          style={{ width: isMobile ? 0 : leftWidth }}
          isMobile={isMobile}
          show={isMobile && mobileView === 'channels'}
        >
          {!isMobile && <DesktopHeader>Channels</DesktopHeader>}
          <ScrollContent>
            {channels.map((ch, i) => (
              <Channel key={i} active={ch === '#general'}>
                {ch}
              </Channel>
            ))}
          </ScrollContent>
          {!isMobile && (
            <DragHandle
              onMouseDown={e => {
                setDragging('left');
                dragOffset.current = e.clientX - leftWidth;
              }}
            />
          )}
        </LeftPane>

        <MiddlePane
          isMobile={isMobile}
          show={!isMobile || mobileView === 'chat'}
        >
          {!isMobile && <DesktopHeader>Chat</DesktopHeader>}
          <ChatScroll>
            <ChatInner>
              {(isMobile ? asciiArtMobile : asciiArtDesktop).map((line, i) => (
                <Line key={i} green hideOnTiny={isMobile && windowWidth < 400}>
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

        <RightPane
          style={{ width: isMobile ? 0 : rightWidth }}
          isMobile={isMobile}
          show={isMobile && mobileView === 'users'}
        >
          {!isMobile && <DesktopHeader>Users ({users.length})</DesktopHeader>}
          <ScrollContent>
            {users.map((u, i) => (
              <User key={i} me={u === '@millkie'} red={u === '!AutoMessage'}>
                {u}
              </User>
            ))}
          </ScrollContent>
          {!isMobile && (
            <DragHandle
              right
              onMouseDown={e => {
                setDragging('right');
                dragOffset.current = window.innerWidth - e.clientX - rightWidth;
              }}
            />
          )}
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
  font-size: clamp(0.7rem, 1.2vw, 1rem);
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

const MobileNav = styled.div`
  display: flex;
  justify-content: space-around;
  background: #111;
  border-bottom: 2px solid #00ff00;
  margin: -10px -10px 10px -10px;
  padding: 5px 0;
`;

const MobileNavButton = styled.button`
  background: ${props => (props.active ? '#00ff00' : 'transparent')};
  color: ${props => (props.active ? '#000' : '#00ff00')};
  border: 1px solid #00ff00;
  padding: 5px 10px;
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  flex: 1;
  margin: 0 2px;

  &:hover {
    background: ${props => (props.active ? '#00ff00' : '#003300')};
  }
`;

const DesktopHeader = styled.div`
  background: #111;
  color: #00ff00;
  border: 1px solid #00ff00;
  padding: 6px 10px;
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 255, 0, 0.1);
`;

const ScrollContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 5px;
`;

const LeftPane = styled.div`
  border-right: ${props => (props.isMobile ? 'none' : '2px solid #fff')};
  padding: ${props =>
    props.isMobile && props.show ? '10px' : props.isMobile ? '0' : '10px'};
  min-width: 0;
  position: relative;
  display: ${props => {
    if (!props.isMobile) return 'flex';
    return props.show ? 'flex' : 'none';
  }};
  flex-direction: column;
  ${props =>
    props.isMobile &&
    props.show &&
    `
    position: absolute;
    top: 35px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    z-index: 100;
    width: 100% !important;
  `}
`;

const MiddlePane = styled.div`
  flex: 1;
  display: ${props => {
    if (!props.isMobile) return 'flex';
    return props.show ? 'flex' : 'none';
  }};
  flex-direction: column;
  padding: ${props => (props.isMobile ? '0 5px' : '0 10px')};
  min-width: 0;
  border-right: ${props => (props.isMobile ? 'none' : '2px solid #fff')};
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
  padding: ${props =>
    props.isMobile && props.show ? '10px' : props.isMobile ? '0' : '10px'};
  min-width: 0;
  position: relative;
  display: ${props => {
    if (!props.isMobile) return 'flex';
    return props.show ? 'flex' : 'none';
  }};
  flex-direction: column;
  ${props =>
    props.isMobile &&
    props.show &&
    `
    position: absolute;
    top: 35px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    z-index: 100;
    width: 100% !important;
  `}
`;

const Line = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: ${props => (props.green ? '#00ff00' : '#ffffff')};
  font-size: inherit;
  display: ${props => (props.hideOnTiny ? 'none' : 'block')};

  @media (max-width: 768px) {
    font-size: 0.75rem;
    line-height: 1.2;
  }

  @media (max-width: 400px) {
    font-size: 0.7rem;
    line-height: 1.15;
  }
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
  padding: 2px 5px;
  font-weight: bold;
  color: ${props => (props.me ? '#ff69b4' : props.red ? '#ff3300' : '#00ff00')};
  cursor: pointer;

  &:hover {
    background: ${props =>
      props.me
        ? 'rgba(255, 105, 180, 0.1)'
        : props.red
        ? 'rgba(255, 51, 0, 0.1)'
        : 'rgba(0, 255, 0, 0.1)'};
  }
`;

const Text = styled.span`
  color: #ffffff;
`;

const Channel = styled.div`
  margin-bottom: 8px;
  padding: 2px 5px;
  font-weight: bold;
  color: ${props => (props.active ? '#ffffff' : '#00ff00')};
  cursor: pointer;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
  }
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
