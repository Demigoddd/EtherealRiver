import React, { useState, useEffect } from "react";
import { Upload, Modal } from "antd";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error: any) => reject(error);
  });
}

const UploadFiles: React.FC<any> = ({ removeAttachment, attachments }) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: attachments,
    statusList: []
  });

  useEffect(() => {
    setState({
      ...state,
      fileList: attachments,
      statusList: attachments.map((att: any) => { return { uid: att.uid, status: att.status } })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attachments]);

  const handleCancel = () => setState({ ...state, previewVisible: false });

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  const handleChange = ({ fileList }: any) =>
    setState({
      ...state,
      fileList
    });

  return (
    <div className="upload-file">
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={state.fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={(file: any) => {
          const statusObj: any = state.statusList.find((n: any) => n.uid === file.uid);
          Object.assign(file, { status: statusObj.status });

          removeAttachment(file)
        }}
      />
      <Modal
        visible={state.previewVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={state.previewImage} />
      </Modal>
    </div>
  );
};

export default UploadFiles;
