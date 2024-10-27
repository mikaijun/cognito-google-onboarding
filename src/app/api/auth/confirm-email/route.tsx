// /api/auth/confirm-email.ts
import { NextRequest, NextResponse } from 'next/server';
import { CognitoIdentityProviderClient, VerifyUserAttributeCommand } from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });

const handler = async (req: NextRequest) => {
  const { accessToken, confirmationCode } = await req.json();

  try {
    const command = new VerifyUserAttributeCommand({
      AccessToken: accessToken,      // ユーザーのアクセス トークン
      AttributeName: "email",        // 確認する属性を指定
      Code: confirmationCode, // メールに送信された確認コード
    });

    await client.send(command);
    return NextResponse.json({ message: 'メールアドレスが確認されました' });
  } catch (error) {
    console.error('Error confirming email:', error);
    return NextResponse.json({ error: 'Error confirming email' }, { status: 500 });
  }
};

export { handler as POST };
