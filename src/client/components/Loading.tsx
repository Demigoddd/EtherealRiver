import React from "react";
import { Spin, Icon } from "antd";

const Loading: React.FC<any> = ({
  className,
  size,
  tip,
  iconType,
}) => (
    <Spin
      className={className}
      size={size || "large"}
      tip={tip}
      indicator={<Icon type={iconType || "loading"} />}
    />
  );

export default Loading;
