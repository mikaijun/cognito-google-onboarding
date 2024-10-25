import { NextRequest, NextResponse } from 'next/server';
import { ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { client, generateSecretHash } from '../../util';

const handler = async (req: NextRequest) => {
  const body = await req.json();
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID!,
    Username: body.email ?? '',
    ConfirmationCode: body.code,
    SecretHash: generateSecretHash(body.email),
  };

  try {
    const command = new ConfirmSignUpCommand(params);
    await client.send(command);
    return NextResponse.json({ message: 'User confirmed successfully' });
  } catch (error) {
    console.error('Error confirming user:', error);
    return NextResponse.json({ message: error });
  }
}

export { handler as POST };
