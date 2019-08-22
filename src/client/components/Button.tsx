import React from "react";
import classNames from "classnames";
import { Button as BaseButton } from "antd";

interface Button {
  disabled?: boolean;
  onClick: any;
  className?: string;
  size: "small" | "default" | "large" | undefined;
  type: "default" | "link" | "ghost" | "primary" | "dashed" | "danger" | undefined;
}

const Button: React.FC<Button> = (props: Button) => (
  <BaseButton
    {...props}
    className={classNames("ant-button", props.className, {
      "button--large": props.size === "large"
    })}
  />
);

export default Button;
