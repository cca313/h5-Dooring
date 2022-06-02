/*
 * @Author: Gavin Chan
 * @Date: 2022-06-01 17:40:38
 * @LastEditors: Gavin
 * @LastEditTime: 2022-06-02 11:00:52
 * @FilePath: \legao\packages\ui\src\ui-component\base\Button\index.tsx
 * @Descriptions: todo
 */
import React, { memo } from 'react';
import { Button } from 'zarm';
import type { IButtonConfig } from './schema';
import logo from '@/assets/text.png';
const Text = memo((props: IButtonConfig & { isTpl: boolean }) => {
  const { align, text, fontSize, bgColor, color, lineHeight, isTpl } = props;
  console.log(bgColor, 'color');
  return (
    <>
      {isTpl ? (
        <div>
          <img src={logo} alt="" />
        </div>
      ) : (
        <Button
          style={{
            backgroundColor: bgColor,
            color,
            textAlign: align,
            fontSize,
            lineHeight,
            height: 'inherit',
            width: 'inherit',
            // display: 'flex',
            // alignItems: 'center',
          }}
        >
          {text}
        </Button>
      )}
    </>
  );
});
export default Text;
