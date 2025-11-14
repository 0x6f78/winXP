import React, { useState } from 'react';
import styled from 'styled-components';

import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';

export default function Services({ onClose }) {
  const [docText, setDocText] = useState(
    `
    ███╗   ███╗██╗██╗     ██╗     ██╗  ██╗██╗███████╗
    ████╗ ████║██║██║     ██║     ██║ ██╔╝██║██╔════╝
    ██╔████╔██║██║██║     ██║     █████╔╝ ██║█████╗
    ██║╚██╔╝██║██║██║     ██║     ██╔═██╗ ██║██╔══╝
    ██║ ╚═╝ ██║██║███████╗███████╗██║  ██╗██║███████╗
    ╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝
    ========================================
                  █   SERVICES   █
    ========================================

    1. Web Development
       - Modern website design
       - Custom web applications
       - Responsive & mobile-friendly sites
       - E-commerce solutions (magento, woocomerce, etc)

    2. 3D Printing
       - Rapid prototyping
       - Custom 3D printing
       - On-demand models and parts

    3. 3D Design & Animation
       - Game level design
       - Custom 3D assets
       - Personalized 3D avatars
       - 3D animation
       - Optimization

    ----------------------------------------
    For inquiries, contact me via Discord:

    https://discord.com/invite/9824xbSgcJ

    ========================================
             THANK YOU FOR VISITING
    ========================================`,
  );

  const [wordWrap, setWordWrap] = useState(false);

  function onClickOptionItem(item) {
    switch (item) {
      case 'Exit':
        onClose();
        break;
      case 'Word Wrap':
        setWordWrap(!wordWrap);
        break;
      case 'Time/Date':
        const date = new Date();
        setDocText(
          `${docText}${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
        );
        break;
      default:
    }
  }

  function onTextAreaKeyDown(e) {
    // Handle tab key in textarea
    if (e.which === 9) {
      e.preventDefault();
      e.persist();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      setDocText(`${docText.substring(0, start)}\t${docText.substring(end)}`);

      // Fix selection after inserting tab
      requestAnimationFrame(() => {
        e.target.selectionStart = start + 1;
        e.target.selectionEnd = start + 1;
      });
    }
  }

  return (
    <Div>
      <section className="np__toolbar">
        <WindowDropDowns items={dropDownData} onClickItem={onClickOptionItem} />
      </section>
      <StyledTextarea
        wordWrap={wordWrap}
        value={docText}
        onChange={e => setDocText(e.target.value)}
        onKeyDown={onTextAreaKeyDown}
        spellCheck={false}
      />
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .np__toolbar {
    position: relative;
    height: 21px;
    flex-shrink: 0;
    border-bottom: 1px solid white;
  }
`;

const StyledTextarea = styled.textarea`
  flex: auto;
  outline: none;
  font-family: 'Lucida Console', monospace;
  font-size: 13px;
  line-height: 14px;
  resize: none;
  padding: 2px;
  ${props => (props.wordWrap ? '' : 'white-space: nowrap; overflow-x: scroll;')}
  overflow-y: scroll;
  border: 1px solid #96abff;
`;
