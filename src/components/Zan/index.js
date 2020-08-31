import { memo } from 'react';
import { Button, Popover } from 'antd';
import styles from './index.less';

const content = (
  <div className={styles.imgWrap}>
    <img src="http://io.nainor.com/uploads/WechatIMG2_1742b586c3d.jpeg" />
  </div>
);

export default memo(function ZanPao() {
  return (
    <div className={styles.takeCat}>
      <Popover placement="top" title={null} content={content} trigger="hover">
        <Button type="primary" danger>
          请作者喝茶🍵～
        </Button>
      </Popover>
    </div>
  );
});
