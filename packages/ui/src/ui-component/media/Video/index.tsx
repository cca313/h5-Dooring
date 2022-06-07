/*
 * @Author: Gavin Chan
 * @Date: 2022-05-20 16:03:56
 * @LastEditors: Gavin
 * @LastEditTime: 2022-06-07 17:03:09
 * @FilePath: \legao\packages\ui\src\ui-component\media\Video\index.tsx
 * @Descriptions: todo
 */
import React, { memo } from 'react';
import { Player, BigPlayButton } from 'video-react';
import './index.css';
import type { IVideoConfig } from './schema';
import logo from '@/assets/video.png';
const VideoPlayer = memo((props: IVideoConfig & { isTpl: boolean }) => {
  const { poster, video, isTpl } = props;
  return (
    <>
      {isTpl ? (
        <div>
          <img src={logo} alt="" />
        </div>
      ) : (
        <div>
          <Player
            playsInline
            poster={poster[0].url}
            src={video[0].url || 'https://gossv.vcg.com/cmsUploadVideo/creative/1移轴/7月移轴.mp4'}
          >
            <BigPlayButton style={{ display: 'none' }} position="center" />
          </Player>
        </div>
      )}
    </>
  );
});

export default VideoPlayer;
