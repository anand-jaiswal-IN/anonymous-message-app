import * as React from "react";

interface VerificationEmailTemplateProps {
  code: string;
  username: string;
}

export const VerificationEmailTemplate: React.FC<
  Readonly<VerificationEmailTemplateProps>
> = ({ username, code }) => (
  <div>
    <p>Hi {username},</p>
    <p>
      Thank you for registering with us. Please click the link below to verify
      your account.
    </p>
    <p>
      Your verification code is: <b>{code}</b>
    </p>
    <p>Best regards</p>
    <p>{username}</p>
  </div>
);
