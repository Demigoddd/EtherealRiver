import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Input, Icon, Tooltip } from "antd";
import { Picker } from "emoji-mart";
import { MessageAction, AttachmentsAction } from '../../../utils/state/actions';
import UploadFiles from '../../../components/UploadFiles';
import { filesApi } from '../../../utils/api';
// @ts-ignore
import { UploadField } from "@navjobs/upload";

const isJoinRoom = false;

const ChatInput: React.FC<any> = ({
  currentRoom,
  isEditMode,
  editMessageId,
  editMessageText,
  editMessageAttachments,
  attachments,
  attachmentLoading,
  fetchSendMessage,
  setMessageEditMode,
  fetchUpdateMessage,
  setAttachments,
  removeAttachment,
  setAttachmentLoading
}) => {
  const [value, setValue] = useState("");
  const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
  const closeSend = (!(value || attachments.length) || attachmentLoading);

  useEffect((): any => {
    if (currentRoom._id) {
      // Call disable edit mode for reset input data.
      disableEditMode();
    }
  }, [currentRoom._id]);

  useEffect((): any => {
    if (isEditMode) {
      setValue(editMessageText);
      setAttachments(editMessageAttachments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMessageText, editMessageAttachments, isEditMode]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!emojiPickerVisible);
  };

  const addEmoji = (e: any) => {
    let emoji = e.native;
    let text = value + emoji;
    setValue(text);
  };

  const handleSendMessage = (e: any) => {
    if (closeSend) return;

    if (e.keyCode === 13 || e.type === 'click') {
      const files = attachments.map((file: any) => file.uid);

      if (isEditMode) {
        fetchUpdateMessage({ messageId: editMessageId, messageText: value, attachments: files });
        disableEditMode();
      } else {
        fetchSendMessage({ text: value, roomId: currentRoom._id, attachments: files });
        setValue("");
        setAttachments([]);
      }
    }
  };

  const disableEditMode = () => {
    setMessageEditMode({ isEditMode: false });
    setValue("");
    setAttachments([]);
  };

  const onSelectFiles = async (files: any) => {
    setAttachmentLoading(true);
    let uploaded: any[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uid = Math.round(Math.random() * 1000);
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
          status: "uploading"
        }
      ];

      setAttachments(uploaded);
      // eslint-disable-next-line no-loop-func
      await filesApi.upload(file).then(({ data }: any) => {
        uploaded = uploaded.map(item => {
          if (item.uid === uid) {
            return {
              status: "done",
              uid: data.file._id,
              name: data.file.filename,
              url: data.file.url
            };
          }
          return item;
        });
      });
    }
    setAttachments(uploaded);
    setAttachmentLoading(false);
  };

  return (
    <React.Fragment>
      {
        isJoinRoom
          ? <></>
          : <>
            <div className="chat-input">
              <div className="chat-input__actions">
                {emojiPickerVisible && (
                  <div className="chat-input__actions--emoji-picker">
                    <Picker onSelect={addEmoji} set="apple" title="" />
                  </div>
                )}
                <Button
                  onClick={toggleEmojiPicker}
                  type="link"
                  shape="circle"
                  icon="smile"
                />
                <UploadField
                  onFiles={onSelectFiles}
                  containerProps={{
                    className: "chat-input__actions--upload-btn"
                  }}
                  uploadProps={{
                    accept: ".jpg,.jpeg,.png,.gif,.bmp",
                    multiple: "multiple"
                  }}
                >
                  <Button type="link" shape="circle" icon="camera" />
                </UploadField>
              </div>
              <div className="chat-input__input-box">
                <Input
                  onChange={e => setValue(e.target.value)}
                  onKeyUp={handleSendMessage}
                  placeholder="Write the new Message…"
                  value={value}
                  suffix={
                    <>
                      {
                        isEditMode
                          ? <Tooltip title="Close edit mode.">
                            <Icon onClick={disableEditMode} type="close" style={{ color: 'rgba(0,0,0,.45)' }} />
                          </Tooltip>
                          : <></>
                      }
                    </>
                  }
                />
                <Button disabled={closeSend} onClick={handleSendMessage} type="primary">
                  Send<Icon type="right" />
                </Button>
              </div>
            </div>
            {attachments.length > 0 && <UploadFiles removeAttachment={removeAttachment} attachments={attachments} />}
          </>
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  currentRoom: state.rooms.currentRoom,
  isEditMode: state.message.editMode.isEditMode,
  editMessageId: state.message.editMode.editMessageId,
  editMessageText: state.message.editMode.editMessageText,
  editMessageAttachments: state.message.editMode.editMessageAttachments,
  attachments: state.attachments.items,
  attachmentLoading: state.attachments.attachmentLoading,
});

export default connect(mapStateToProps, { ...MessageAction, ...AttachmentsAction })(ChatInput);
