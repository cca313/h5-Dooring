import React, { memo } from 'react';
import type { IPriceConfig } from './schema';

// import styles from './index.less';

import logo from '@/assets/text.png';
const Modal = memo((props: IPriceConfig & { isTpl: boolean }) => {
  const { text, fontSize, color, lineHeight, textAlign, isTpl } = props;
  return (
    <>
      {isTpl ? (
        <div>
          <img src={logo} alt="" />
        </div>
      ) : (
        <div
          // className={styles.modal}
          style={{
            color,
            // textIndent: indent + 'px',
            fontSize,
            lineHeight,
            textAlign,
            // backgroundColor: bgColor,
            // padding,
            // borderRadius: radius,
          }}
        >
          <div>{text}</div>
        </div>
      )}
    </>
  );
});
export default Modal;
