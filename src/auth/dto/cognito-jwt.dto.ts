import { UserDocument } from "src/user/entities/user.entity";

export class CognitoJWTDto {
  constructor(
    sub: string,
    emailVerified: boolean,
    iss: string,
    phoneNumberVerified: boolean,
    cognitoUsername: string,
    originJTI: string,
    aud: string,
    eventId: string,
    tokenUse: string,
    authTime: number,
    phoneNumber: string,
    exp: number,
    iat: number,
    jti: string,
    email: string,
  ) {
    this.sub = sub;
    this.emailVerified = emailVerified;
    this.iss = iss;
    this.phoneNumberVerified = phoneNumberVerified;
    this.cognitoUsername = cognitoUsername;
    this.originJTI = originJTI;
    this.aud = aud;
    this.eventId = eventId;
    this.tokenUse = tokenUse;
    this.authTime = authTime;
    this.phoneNumber = phoneNumber;
    this.exp = exp;
    this.iat = iat;
    this.jti = jti;
    this.email = email;
  }

  sub: string;
  emailVerified: boolean;
  iss: string;
  phoneNumberVerified: boolean;
  cognitoUsername: string;
  originJTI: string;
  aud: string;
  eventId: string;
  tokenUse: string;
  authTime: number;
  phoneNumber: string;
  exp: number;
  iat: number;
  jti: string;
  email: string;
  dbUser: UserDocument
}
