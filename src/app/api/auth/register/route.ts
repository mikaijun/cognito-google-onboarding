import { NextRequest, NextResponse } from 'next/server';
import { SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { client, generateSecretHash } from '../../util';

const handler = async (req: NextRequest) => {
  const body = await req.json();
  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID!,
    Username: body.email ?? "",
    Password: body.password ?? "",
    UserAttributes: [
      {
        Name: 'email',
        Value: body.email ?? "",
      },
    ],
    SecretHash: generateSecretHash(body.email),
  };

  try {
    const command = new SignUpCommand(params);
    await client.send(command);
    console.log(11111111111111);
    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export { handler as POST };
