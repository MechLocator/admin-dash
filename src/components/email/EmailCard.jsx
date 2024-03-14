import { Button } from "antd";
import React from "react";

const EmailCard = ({ email, password, onSend }) => {
  return (
    <div>
      <div>
        {email}
        <div>{password}</div>
      </div>
      <Button onClick={onSend}>Click Me</Button>
    </div>
  );
};

export default EmailCard;
