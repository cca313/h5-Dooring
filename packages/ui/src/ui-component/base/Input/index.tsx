/*
 * @Author: Gavin Chan
 * @Date: 2022-06-01 17:40:38
 * @LastEditors: Gavin
 * @LastEditTime: 2022-06-02 16:33:04
 * @FilePath: \legao\packages\ui\src\ui-component\base\Input\index.tsx
 * @Descriptions: todo
 */
import React, { memo } from 'react';
import { Input } from 'zarm';
import type { IInputConfig } from './schema';
import logo from '@/assets/text.png';
const Text = memo((props: IInputConfig & { isTpl: boolean }) => {
  // const { align, text, fontSize, bgColor, color, lineHeight, isTpl } = props;
  const { isTpl, placeholder } = props;
  return (
    <>
      {isTpl ? (
        <div>
          <img src={logo} alt="" />
        </div>
      ) : (
        <Input placeholder={placeholder} />
      )}
    </>
  );
});
export default Text;
