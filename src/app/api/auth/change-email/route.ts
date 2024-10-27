import { NextRequest, NextResponse } from 'next/server';
import { CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand } from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({ region: process.env.COGNITO_REGION });

const handler = async (req: NextRequest) => {
  const { newEmail, email } = await req.json();

  try {
    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: email,
      UserAttributes: [
        {
          Name: 'email',
          Value: newEmail,
        },
        {
          Name: 'email_verified',
          Value: 'false', // メール変更後に再度確認する必要がある場合
        },
      ],
    });
    await client.send(command);

    return NextResponse.json({ message: 'Email address updated successfully' });
  } catch (error) {
    console.error('Error updating email address:', error);
    return NextResponse.json({ error: 'Error updating email address' }, { status: 500 });
  }
}

export { handler as POST };
