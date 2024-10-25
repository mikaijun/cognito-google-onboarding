import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminGetUserCommand,
  AdminCreateUserRequest,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import CredentialsProvider from 'next-auth/providers/credentials'
import { generateSecretHash } from '../../util';

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.COGNITO_REGION,
});

/**
 * Cognitoにユーザーが存在するか確認する
*/
async function checkUserExists(email: string): Promise<boolean> {
  try {
    await cognitoClient.send(
      new AdminGetUserCommand({
        UserPoolId: process.env.COGNITO_USER_POOL_ID!,
        Username: email,
      })
    );
    return true;
  } catch (error) {
    // NOTE: ユーザーが存在しない場合はUserNotFoundExceptionが発生する。この時は後続処理を続行するためfalseを返す
    if ((error as { name: string }).name === 'UserNotFoundException') {
      return false;
    } else {
      console.error('Failed to check user existence in Cognito:', error);
      throw error;
    }
  }
}

/**
 * Cognitoにユーザーを作成する
*/
async function createUserInCognito(email: string, name: string) {
  const params: AdminCreateUserRequest = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID!,
    Username: email,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'name',
        Value: name,
      },
      {
        Name: 'email_verified',
        Value: 'true',
      },
    ],
    // NOTE: Googleのユーザーはパスワードメールを受け取らないため、パスワードリセットを強制する
    MessageAction: 'SUPPRESS',
  };

  try {
    const command = new AdminCreateUserCommand(params);
    await cognitoClient.send(command);
  } catch (error) {
    throw error;
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Cognito',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email ?? '';
        const password = credentials?.password ?? '';

        try {
          const response = await cognitoClient.send(
            new InitiateAuthCommand({
              AuthFlow: 'USER_PASSWORD_AUTH',
              ClientId: process.env.COGNITO_CLIENT_ID!,
              AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                SECRET_HASH: generateSecretHash(email),
              },
            })
          );

          if (!response.AuthenticationResult) {
            throw new Error('No Auth Response Result');
          }

          const { IdToken, AccessToken, ExpiresIn, RefreshToken } = response.AuthenticationResult;

          return {
            id: "",
            email,
            idToken: IdToken,
            accessToken: AccessToken!,
            expiresIn: ExpiresIn!,
            refreshToken: RefreshToken!,
          };
        } catch (error) {
          console.error('Failed to authenticate user:', error);
          throw new Error('Auth Error');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const userExists = await checkUserExists(user.email!);

          if (!userExists) {
            await createUserInCognito(user.email!, user.name || '');
          }
        } catch (error) {
          console.error('Failed to create user in Cognito:', error);
          return false;
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
