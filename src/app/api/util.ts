import crypto from 'crypto';
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const client = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });

export const generateSecretHash = (username: string): string => {
  return crypto
    .createHmac('SHA256', process.env.COGNITO_CLIENT_SECRET!)
    .update(username + process.env.COGNITO_CLIENT_ID!)
    .digest('base64');
};
