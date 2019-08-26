import React from 'react';
import { withRouter } from 'react-router-dom';
import { Result, Button, Icon } from 'antd';

const NotFound: React.FC<any> = ({ history }: any) => (
  <>
    <Result
      status="404"
      icon={<Icon type="smile" theme="twoTone" />}
      title="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => history.push('/')}>Back Home</Button>}
    />,
  </>
);

export default withRouter(NotFound);