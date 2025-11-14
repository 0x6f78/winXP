import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

function Cmd() {
  // -------------------------------
  // STATE
  // -------------------------------
  const [gpuData, setGpuData] = useState([
    {
      text: 'GPU #0 - AMD SAPPHIRE 5970',
      cores: [435.2, 432.8],
      temp: 72,
      fan: 80,
    },
    {
      text: 'GPU #1 - AMD SAPPHIRE 5970',
      cores: [438.1, 434.7],
      temp: 73,
      fan: 78,
    },
    {
      text: 'GPU #2 - AMD SAPPHIRE 5970',
      cores: [436.5, 433.9],
      temp: 71,
      fan: 79,
    },
    {
      text: 'GPU #3 - AMD SAPPHIRE 5970',
      cores: [439.0, 435.2],
      temp: 74,
      fan: 81,
    },
    {
      text: 'GPU #4 - AMD SAPPHIRE 5970',
      cores: [437.6, 434.4],
      temp: 72,
      fan: 80,
    },
  ]);

  const [acceptedShares, setAcceptedShares] = useState(182);
  const [logMessages, setLogMessages] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const messagesEndRef = useRef(null);

  // -------------------------------
  // UTILITY
  // -------------------------------
  const jitter = (value, percent = 0.02) => {
    const variance = value * percent;
    return value + (Math.random() * variance * 2 - variance);
  };

  // -------------------------------
  // AUTO SCROLL
  // -------------------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logMessages]);

  // -------------------------------
  // GPU TEMP + HASHRATE UPDATES (1 sec)
  // -------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setGpuData(prev =>
        prev.map(gpu => ({
          ...gpu,
          cores: gpu.cores.map(c => Number(jitter(c, 0.03).toFixed(1))),
          temp: Math.max(60, Math.min(90, gpu.temp + (Math.random() * 4 - 2))),
          fan: Math.max(50, Math.min(100, gpu.fan + (Math.random() * 6 - 3))),
        })),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // -------------------------------
  // ACCEPTED SHARES (random 6–15 sec)
  // -------------------------------
  useEffect(() => {
    const spawnShareTimer = () => {
      const delay = Math.random() * (15000 - 6000) + 6000;

      return setTimeout(() => {
        const amount = Math.floor(Math.random() * 4) + 1;

        setAcceptedShares(prev => prev + amount);

        setLogMessages(prev => [
          ...prev,
          {
            type: 'share',
            time: new Date().toLocaleTimeString(),
            text: `Share accepted (+${amount})`,
          },
        ]);

        spawnShareTimer();
      }, delay);
    };

    const timer = spawnShareTimer();
    return () => clearTimeout(timer);
  }, []);

  // -------------------------------
  // BLOCK FOUND (random 6–30 sec) + FULL REFRESH
  // -------------------------------
  useEffect(() => {
    const spawnBlockTimer = () => {
      const delay = Math.random() * (30000 - 6000) + 6000;

      return setTimeout(() => {
        setLogMessages(prev => [
          ...prev,
          {
            type: 'block',
            time: new Date().toLocaleTimeString(),
            text: '*** New block found! 🔥 ***',
          },
        ]);

        setRefreshKey(Math.random());
        spawnBlockTimer();
      }, delay);
    };

    const timer = spawnBlockTimer();
    return () => clearTimeout(timer);
  }, []);

  // -------------------------------
  // ASCII + HEADER
  // -------------------------------
  const headerLines = [
    ' ██████╗ ██╗  ██╗███╗   ███╗██╗███╗   ██╗███████╗██████╗ ',
    '██╔═████╗╚██╗██╔╝████╗ ████║██║████╗  ██║██╔════╝██╔══██╗',
    '██║██╔██║ ╚███╔╝ ██╔████╔██║██║██╔██╗ ██║█████╗  ██████╔╝',
    '████╔╝██║ ██╔██╗ ██║╚██╔╝██║██║██║╚██╗██║██╔══╝  ██╔══██╗',
    '╚██████╔╝██╔╝ ██╗██║ ╚═╝ ██║██║██║ ╚████║███████╗██║  ██║',
    ' ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝',
    '==================================================================',
    'BTC Miner v0.8.1 - 0x6f78 - AMD OpenCL GPU Mining',
    '==================================================================',
    '[INFO] Detected GPUs: 5',
    '------------------------------------------------------------------',
  ];

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <CmdWindow key={refreshKey}>
      {headerLines.map((line, i) => (
        <Line green key={i}>
          {line}
        </Line>
      ))}

      {/* GPUs */}
      {gpuData.map((gpu, i) => (
        <div key={i}>
          <Line pink>{gpu.text}</Line>

          {gpu.cores.map((core, idx) => (
            <Line white key={idx}>
              Core {idx}: {core.toFixed(1)} KH/s
            </Line>
          ))}

          <Line white>
            Temp: <Value pink>{gpu.temp.toFixed(0)}°C</Value> Fan:{' '}
            <Value pink>{gpu.fan.toFixed(0)}%</Value>
          </Line>

          <Line green>
            ------------------------------------------------------------------
          </Line>
        </div>
      ))}

      {/* Stats */}
      <Line white>
        Total Hashrate:{' '}
        <Value pink>
          {(
            gpuData.reduce(
              (sum, g) => sum + g.cores.reduce((a, b) => a + b, 0),
              0,
            ) / 1000
          ).toFixed(2)}{' '}
          MH/s
        </Value>
      </Line>

      <Line white>
        Accepted Shares: <Value pink>{acceptedShares}</Value>
      </Line>

      <Line white>
        Rejected Shares: <Value pink>3</Value>
      </Line>
      <Line white>
        Pool: <Value pink>stratum+tcp://btc.milkieverse.cc:3333</Value>
      </Line>
      <Line white>
        Worker: <Value pink>rig01</Value>
      </Line>
      <Line white>
        Difficulty: <Value pink>42.000 GH</Value>
      </Line>
      <Line white>
        Uptime: <Value pink>03:42:15</Value>
      </Line>
      <Line green>
        ==================================================================
      </Line>

      {/* Logs */}
      {logMessages.map((msg, i) => {
        if (msg.type === 'share') {
          return (
            <Line white key={i}>
              <Timestamp>[{msg.time}]</Timestamp> {msg.text}
            </Line>
          );
        }

        if (msg.type === 'block') {
          return (
            <Line pink key={i}>
              <Timestamp>[{msg.time}]</Timestamp> {msg.text}
            </Line>
          );
        }

        return null;
      })}

      <div ref={messagesEndRef} />
    </CmdWindow>
  );
}

//
// --------------------------------
// STYLES
// --------------------------------
//
const CmdWindow = styled.div`
  background-color: #000;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  padding: 20px;
  width: 100%;
  height: 100%;
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

const Timestamp = styled.span`
  color: #00ff00;
`;

export default Cmd;
