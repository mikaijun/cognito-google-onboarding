import { NextRequest, NextResponse } from 'next/server';
import { CognitoIdentityProviderClient, AdminSetUserPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });

const handler = async (req: NextRequest) => {
  const { newPassword, email } = await req.json();

  try {
    const command = new AdminSetUserPasswordCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: email,
      Password: newPassword,
      Permanent: true,
    });
    await client.send(command);

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Error resetting password' }, { status: 500 });
  }
}

export { handler as POST };
