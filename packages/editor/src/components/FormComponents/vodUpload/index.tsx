/*
 * @Author: Gavin Chan
 * @Date: 2022-06-06 14:11:17
 * @LastEditors: Gavin
 * @LastEditTime: 2022-06-07 17:24:09
 * @FilePath: \legao\packages\editor\src\components\FormComponents\vodUpload\index.tsx
 * @Descriptions: todo
 */
import React, { useEffect, useState } from 'react';
import { Upload, message, Space, Button } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Axios from 'axios';
import TcVod from 'vod-js-sdk-v6';

// const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

interface IVideoUploader {
  fileList?: UploadFile<any>[];
  maxLen?: number;
  onChange?: (v: any) => void;
}

const VodUpload = (props: IVideoUploader) => {
  console.log(props);
  // const [loading, setLoading] = useState(false);
  // const [videoUrl, setVideoUrl] = useState<string>();
  const [vodInstance, setVodInstance] = useState<any>({});

  const { maxLen = 1, onChange } = props;

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    // console.log(info, vodInstance);
    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   setLoading(false);
    //   console.log(info.file);
    //   // setVideoUrl(url);
    //   // Get this url from response in real world.
    //   // getBase64(info.file.originFileObj as RcFile, (url) => {
    //   //   setLoading(false);
    //   //   setVideoUrl(url);
    //   // });
    // }
  };

  /* 上传前校验格式和大小 */
  const beforeUpload = (file: RcFile) => {
    console.log(file);
    const legalFormat = ['video/mp4'];
    if (!legalFormat.includes(file.type)) {
      message.error(`请上传正确的视频格式,如${legalFormat.join(',')}`);
    }
    const limitSize = 300 * 1024 * 1024;
    if (file.size > limitSize) {
      message.error('视频大小不能超过300M');
    }
    return legalFormat.includes(file.type) && file.size < limitSize;
  };

  const customUpload = (params: any) => {
    const { data, file, onProgress, onError, onSuccess } = params;
    const uploader = vodInstance.upload({
      mediaFile: file,
    });
    uploader.on('media_progress', function (info: any) {
      console.log(info.percent); // 进度
      if (info.percent > 0) {
        onProgress({ percent: info.percent * 100 });
      }
    });
    uploader
      .done()
      .then(function (doneResult: any) {
        const {
          fileId,
          video: { url },
        } = doneResult;
        if (fileId) {
          onSuccess(doneResult);
          const files = [{ uid: fileId, name: file.name, status: 'done', url }];
          onChange && onChange(files);
        }
        console.log('result', doneResult);
        // deal with doneResult
      })
      .catch(function (err: Error) {
        onError(err);
        console.log('err', err);
        // deal with error
      });
  };
  const getSignature = () => {
    return Axios.get(
      'http://testadver.hxledu.com/plat/' + '/common-server/app/getSignature?classId=' + '889123',
    ).then(function (res) {
      return res.data.data;
    });
  };
  useEffect(() => {
    const vod: any = new TcVod({ getSignature: getSignature });
    setVodInstance(vod);
    // getSignature();
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Upload
        name="video"
        listType="picture"
        customRequest={customUpload}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={maxLen}
      >
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
    </Space>
  );
};

export default VodUpload;
