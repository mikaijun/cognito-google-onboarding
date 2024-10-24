import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminGetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.COGNITO_REGION,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        let userExists = false;

        try {
          // ユーザーが存在するかをチェック
          await cognitoClient.send(
            new AdminGetUserCommand({
              UserPoolId: process.env.COGNITO_USER_POOL_ID!,
              Username: user.email!,
            })
          );
          userExists = true;
          console.log('User already exists in Cognito');
        } catch (error) {
          if ((error as { name: string }).name === 'UserNotFoundException') {
            console.log('User does not exist in Cognito');
          } else {
            console.error('Failed to check user existence in Cognito:', error);
            return false;
          }
        }

        // ユーザーが存在しない場合のみ新規作成
        if (!userExists) {
          try {
            const params = {
              UserPoolId: process.env.COGNITO_USER_POOL_ID!,
              Username: user.email!,
              UserAttributes: [
                {
                  Name: 'email',
                  Value: user.email!,
                },
                {
                  Name: 'name',
                  Value: user.name || '',
                },
                {
                  Name: 'email_verified',
                  Value: 'true',
                },
              ],
            };
            const command = new AdminCreateUserCommand(params);
            await cognitoClient.send(command);
            console.log('New user created in Cognito');
          } catch (createError) {
            console.error('Failed to create new user in Cognito:', createError);
            return false; // 作成に失敗した場合は認証をキャンセル
          }
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
