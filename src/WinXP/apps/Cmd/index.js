import React from 'react';
import styled from 'styled-components';

function Cmd() {
  const lines = [
    // ASCII art

    ' ██████╗ ██╗  ██╗███╗   ███╗██╗███╗   ██╗███████╗██████╗    ██████╗  █████╗ ████████╗',
    '██╔═████╗╚██╗██╔╝████╗ ████║██║████╗  ██║██╔════╝██╔══██╗   ██╔══██╗██╔══██╗╚══██╔══╝',
    '██║██╔██║ ╚███╔╝ ██╔████╔██║██║██╔██╗ ██║█████╗  ██████╔╝   ██████╔╝███████║   ██║   ',
    '████╔╝██║ ██╔██╗ ██║╚██╔╝██║██║██║╚██╗██║██╔══╝  ██╔══██╗   ██╔══██╗██╔══██║   ██║   ',
    '╚██████╔╝██╔╝ ██╗██║ ╚═╝ ██║██║██║ ╚████║███████╗██║  ██║██╗██████╔╝██║  ██║   ██║   ',
    ' ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   ',

    '==================================================================',
    'BTC Miner v0.8.1 - 0x6f78 - AMD OpenCL GPU Mining',
    '==================================================================',
    '[INFO] Detected GPUs: 5',
    '------------------------------------------------------------------',
    // GPU info
    {
      type: 'gpu',
      text: 'GPU #0',
      cores: ['Core 0: 435.2 KH/s', 'Core 1: 432.8 KH/s'],
      temp: '72°C',
      fan: '80%',
    },
    {
      type: 'gpu',
      text: 'GPU #1',
      cores: ['Core 0: 438.1 KH/s', 'Core 1: 434.7 KH/s'],
      temp: '73°C',
      fan: '78%',
    },
    {
      type: 'gpu',
      text: 'GPU #2',
      cores: ['Core 0: 436.5 KH/s', 'Core 1: 433.9 KH/s'],
      temp: '71°C',
      fan: '79%',
    },
    {
      type: 'gpu',
      text: 'GPU #3',
      cores: ['Core 0: 439.0 KH/s', 'Core 1: 435.2 KH/s'],
      temp: '74°C',
      fan: '81%',
    },
    {
      type: 'gpu',
      text: 'GPU #4',
      cores: ['Core 0: 437.6 KH/s', 'Core 1: 434.4 KH/s'],
      temp: '72°C',
      fan: '80%',
    },
    '------------------------------------------------------------------',
    // Stats
    { type: 'stat', label: 'Total Hashrate:', value: '4.39 MH/s' },
    { type: 'stat', label: 'Accepted Shares:', value: '182' },
    { type: 'stat', label: 'Rejected Shares:', value: '3' },
    {
      type: 'stat',
      label: 'Pool:',
      value: 'stratum+tcp://btc.milkieverse.cc:3333',
    },
    { type: 'stat', label: 'Worker:', value: 'rig01' },
    { type: 'stat', label: 'Difficulty:', value: '42.000 GH' },
    { type: 'stat', label: 'Uptime:', value: '03:42:15' },
    '==================================================================',
  ];

  return (
    <CmdWindow>
      {lines.map((line, i) => {
        if (typeof line === 'string') {
          if (line.startsWith('====') || line.startsWith('----')) {
            return (
              <Line key={i} white>
                {line}
              </Line>
            ); // separator lines
          } else if (
            line === '0xBTC Miner v0.8.1 - AMD OpenCL GPU Mining' ||
            line === '[INFO] Detected GPUs: 5'
          ) {
            return (
              <Line key={i} pink>
                {line}
              </Line>
            ); // pink header
          } else {
            return (
              <Line key={i} green>
                {line}
              </Line>
            ); // ASCII art and others green
          }
        } else if (line.type === 'gpu') {
          return (
            <div key={i}>
              <Line pink>{line.text}</Line>
              {line.cores.map((core, idx) => (
                <Line key={idx} white>
                  {core}
                </Line>
              ))}
              <Line white>
                Temp: <Value pink>{line.temp}</Value> Fan:{' '}
                <Value pink>{line.fan}</Value>
              </Line>
            </div>
          );
        } else if (line.type === 'stat') {
          return (
            <Line key={i} white>
              {line.label} <Value pink>{line.value}</Value>
            </Line>
          );
        }
      })}
    </CmdWindow>
  );
}

// Styled components
const CmdWindow = styled.div`
  background-color: #000000;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  padding: 20px;
  width: 850px; /* a bit wider for ASCII */
  height: 760px;
  overflow-y: auto;
  white-space: pre;
`;

const Line = styled.div`
  color: ${props =>
    props.green
      ? '#00ff00'
      : props.pink
      ? '#ff69b4'
      : props.white
      ? '#ffffff'
      : '#00ff00'};
`;

const Value = styled.span`
  color: ${props => (props.pink ? '#ff69b4' : '#ffffff')};
`;

export default Cmd;
