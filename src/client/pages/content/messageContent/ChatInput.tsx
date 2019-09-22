import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Input, Icon, Tooltip } from "antd";
import { Picker } from "emoji-mart";
import { MessageAction } from '../../../utils/state/actions';
// @ts-ignore
import { UploadField } from "@navjobs/upload";

const isJoinRoom = false;

const ChatInput: React.FC<any> = ({
  currentRoom,
  isEditMode,
  editMessageId,
  editMessageText,
  fetchSendMessage,
  setMessageEditMode,
  fetchUpdateMessage
}) => {
  const [value, setValue] = useState("");
  const [emojiPickerVisible, setShowEmojiPicker] = useState(false);

  useEffect((): any => {
    if (editMessageText && isEditMode) {
      setValue(editMessageText);
    }
  }, [editMessageText, isEditMode]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!emojiPickerVisible);
  };

  const addEmoji = (e: any) => {
    let emoji = e.native;
    let text = value + emoji;
    setValue(text);
  };

  const handleSendMessage = (e: any) => {
    if (e.keyCode === 13 || e.type === 'click') {
      if (isEditMode) {
        fetchUpdateMessage({ messageId: editMessageId, messageText: value });
        disableEditMode();
      } else {
        fetchSendMessage(value, currentRoom._id);
        setValue("");
      }
    }
  };

  const disableEditMode = () => {
    setMessageEditMode({ isEditMode: false });
    setValue("");
  };

  return (
    <React.Fragment>
      {
        isJoinRoom
          ? <></>
          : <div className="chat-input">
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
                onFiles={(files: any) => console.log(files)}
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
              <Button onClick={handleSendMessage} type="primary">
                Send<Icon type="right" />
              </Button>
            </div>
          </div>
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  currentRoom: state.rooms.currentRoom,
  isEditMode: state.message.editMode.isEditMode,
  editMessageId: state.message.editMode.editMessageId,
  editMessageText: state.message.editMode.editMessageText,
});

export default connect(mapStateToProps, MessageAction)(ChatInput);
