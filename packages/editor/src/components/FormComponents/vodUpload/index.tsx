/*
 * @Author: Gavin Chan
 * @Date: 2022-06-06 14:11:17
 * @LastEditors: Gavin
 * @LastEditTime: 2022-06-06 15:59:50
 * @FilePath: \legao\packages\editor\src\components\FormComponents\vodUpload\index.tsx
 * @Descriptions: todo
 */
import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const legalFormat = ['mp4'];
  if (!legalFormat.includes(file.type)) {
    message.error(`请上传正确的视频格式,如${legalFormat.join(',')}`);
  }
  const limitSize = 300 * 1024 * 1024;
  if (file.size > limitSize) {
    message.error('视频大小不能超过300M');
  }
  return legalFormat.includes(file.type) && file.size < limitSize;
};

const VodUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      console.log(info.file);
      // setVideoUrl(url);
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj as RcFile, (url) => {
      //   setLoading(false);
      //   setVideoUrl(url);
      // });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const customUpload = () => {};

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      customRequest={customUpload}
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {videoUrl ? <img alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default VodUpload;
