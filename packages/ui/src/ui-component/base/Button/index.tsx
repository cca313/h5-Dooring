/*
 * @Author: Gavin Chan
 * @Date: 2022-06-01 17:40:38
 * @LastEditors: Gavin
 * @LastEditTime: 2022-06-01 17:57:56
 * @FilePath: \legao\packages\ui\src\ui-component\base\Button\index.tsx
 * @Descriptions: todo
 */
import React, { memo } from 'react';

import type { IButtonConfig } from './schema';
import logo from '@/assets/text.png';
const Text = memo((props: IButtonConfig & { isTpl: boolean }) => {
  const { align, text, fontSize, color, lineHeight, isTpl } = props;
  return (
    <>
      {isTpl ? (
        <div>
          <img src={logo} alt="" />
        </div>
      ) : (
        <div style={{ color, textAlign: align, fontSize, lineHeight }}>{text}</div>
      )}
    </>
  );
});
export default Text;
