import React, { memo } from 'react';
import type { IModalConfig } from './schema';

import styles from './index.less';

import logo from '@/assets/longText.png';
const Modal = memo((props: IModalConfig & { isTpl: boolean }) => {
  const { title, fontSize, color, bgColor, isTpl } = props;
  return (
    <>
      {isTpl ? (
        <div>
          <img src={logo} alt="" />
        </div>
      ) : (
        <div
          className={styles.modal}
          style={{
            color,
            // textIndent: indent + 'px',
            fontSize,
            // lineHeight,
            // textAlign,
            backgroundColor: bgColor,
            // padding,
            // borderRadius: radius,
          }}
        >
          <div className={styles.mask}>{title}</div>
        </div>
      )}
    </>
  );
});
export default Modal;
