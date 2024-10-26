import { NextRequest, NextResponse } from 'next/server';
import { ForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import { client, generateSecretHash } from '../../util';

const handler = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: body.email ?? "",
      SecretHash: generateSecretHash(body.email),
    };
    const command = new ForgotPasswordCommand(params);
    await client.send(command);
    return NextResponse.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export { handler as POST };
