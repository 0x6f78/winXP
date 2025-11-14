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
      user: 'Shadow_DropBear',
      text: 'Already logging every move. Ghost traces, fully encrypted.',
    },
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
