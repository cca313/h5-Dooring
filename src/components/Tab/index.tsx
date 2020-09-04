import React, { useEffect, useRef } from 'react';
import { Tabs } from 'zarm';
import styles from './index.less';
import { TabConfigType } from '../DynamicEngine/schema';

const { Panel } = Tabs;

const XTab = (props: TabConfigType) => {
  const { tabs = ['分类一', '分类二'], activeColor, color, fontSize, sourceData } = props;

  const tabWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabWrapRef.current) {
      let res = tabWrapRef.current.querySelector('.za-tabs__line') as HTMLElement;
      if (res) {
        res.style.backgroundColor = activeColor;
      }
    }
  }, [activeColor]);

  return (
    <div className={styles.tabWrap} ref={tabWrapRef}>
      <Tabs
        canSwipe
        onChange={i => {
          console.log(i);
        }}
      >
        {tabs.map((item, i) => {
          return (
            <Panel title={item} key={i}>
              <div className={styles.content}>
                {sourceData
                  .filter(item => item.type === i)
                  .map((item, i) => {
                    return (
                      <div className={styles.item} key={i}>
                        <a className={styles.imgWrap} href={item.link} title={item.desc}>
                          <img
                            src={
                              item.imgUrl[0]
                                ? item.imgUrl[0].url
                                : 'http://io.nainor.com/uploads/01_173e15d3493.png'
                            }
                            alt={item.title}
                          />
                          <div className={styles.title} style={{ fontSize, color }}>
                            {item.title}
                          </div>
                        </a>
                      </div>
                    );
                  })}
              </div>
            </Panel>
          );
        })}
      </Tabs>
    </div>
  );
};

export default XTab;
