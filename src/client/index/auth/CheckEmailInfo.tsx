import React, { useEffect, useState } from "react";
import { Result, Button } from "antd";
import userApi from "../../utils/api/user";

const renderTextInfo = (hash: any, verified: any) => {
  if (hash) {
    if (verified) {
      return {
        status: "success",
        message: "Account verified successfully!"
      };
    } else {
      return {
        status: "error",
        message: "Account Verification Error!"
      };
    }
  } else {
    return {
      status: "success",
      message: "Account confirmation link sent to E-Mail."
    };
  }
};

const CheckEmailInfo = ({ location, history }: any) => {
  const [verified, setVerified] = useState(false);
  const hash: any = location.hash.split("hash=")[1];
  const info: any = renderTextInfo(hash, verified);

  useEffect(() => {
    if (hash) {
      userApi.verifyHash(hash).then(({ data }) => {
        if (data.status === "success") {
          setVerified(true);
        }
      });
    }
  });

  return (
    <div className="auth__block">
      <Result
        status={info.status}
        title={info.status === "success" ? "Done!" : "Error!"}
        subTitle={info.message}
        extra={
          info.status === "success" &&
          verified && (
            <Button type="primary" onClick={() => history.push("/login")}>
              Log In
            </Button>
          )
        }
      />
    </div>
  );
};

export default CheckEmailInfo;
