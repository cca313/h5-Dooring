/*
 * @Author: Gavin Chan
 * @Date: 2022-05-20 16:03:56
 * @LastEditors: Gavin
 * @LastEditTime: 2022-06-07 15:41:51
 * @FilePath: \legao\packages\ui\src\ui-component\media\Video\schema.ts
 * @Descriptions: todo
 */
import type {
  ITextConfigType,
  IImgUploadConfigType,
  IVodUploadConfigType,
  TTextDefaultType,
  TImgUploadDefaultType,
  TVodUploadDefaultType,
} from '@/components/FormComponents/types';

export type TVideoEditData = (IImgUploadConfigType | IVodUploadConfigType)[];
export interface IVideoConfig {
  poster: TImgUploadDefaultType;
  video: TVodUploadDefaultType;
}

export interface IVideoSchema {
  editData: TVideoEditData;
  config: IVideoConfig;
}

const Video: IVideoSchema = {
  editData: [
    {
      key: 'poster',
      name: '视频封面',
      type: 'ImgUpload',
    },
    {
      key: 'video',
      name: '视频上传',
      type: 'VodUpload',
    },
  ],
  config: {
    poster: [
      {
        uid: '001',
        name: 'image.png',
        status: 'done',
        url: 'http://49.234.61.19/uploads/1_1740c6fbcd9.png',
      },
    ],
    video: [
      {
        uid: '001',
        name: 'vidoe.mp4',
        status: 'done',
        url: '',
      },
    ],
  },
};

export default Video;
