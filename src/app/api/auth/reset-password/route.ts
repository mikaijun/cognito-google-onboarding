import { NextRequest, NextResponse } from 'next/server';
import { ConfirmForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import { client, generateSecretHash } from '../../util';

const handler = async (req: NextRequest) => {
  const { email, confirmationCode, newPassword } = await req.json();

  try {
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: email,
      ConfirmationCode: confirmationCode,
      Password: newPassword,
      SecretHash: generateSecretHash(email),
    };
    const command = new ConfirmForgotPasswordCommand(params);
    await client.send(command);
    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Error resetting password' }, { status: 500 });
  }
}

export { handler as POST };
