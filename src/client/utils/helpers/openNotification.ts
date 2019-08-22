import { notification } from "antd";

const openNotification = ({ text, type = "info", title, duration = 3 }: any) => {
  let message: any = notification;

  message[type]({
    message: title,
    description: text,
    duration: duration
  });
};

const destroyNotifiaction = () => {
  notification.destroy();
};

export {
  openNotification,
  destroyNotifiaction
}
