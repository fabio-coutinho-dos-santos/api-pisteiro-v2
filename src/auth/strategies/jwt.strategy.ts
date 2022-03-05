import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { CognitoJWTDto } from 'src/auth/dto/cognito-jwt.dto';
import { JogadorService } from 'src/jogador/jogador.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jogadorService: JogadorService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.authority}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.clientId,
      issuer: process.env.authority,
      algorithms: ['RS256'],
    });
  }

  public async validate(rawPayload: { [x: string]: any }) {
    const userPayload = this.parseRawPayload(rawPayload);
    const dbUser = await this.jogadorService.findUserByAuthId(
      userPayload.cognitoUsername,
    );
    userPayload.dbUser = dbUser;
    return userPayload;
  }

  private parseRawPayload(rawPayload: any) {
    return new CognitoJWTDto(
      rawPayload['sub'],
      rawPayload['email_verified'],
      rawPayload['iss'],
      rawPayload['phone_number_verified'],
      rawPayload['cognito:username'],
      rawPayload['origin_jti'],
      rawPayload['aud'],
      rawPayload['event_id'],
      rawPayload['token_use'],
      rawPayload['auth_time'],
      rawPayload['phone_number'],
      rawPayload['exp'],
      rawPayload['iat'],
      rawPayload['jti'],
      rawPayload['email'],
    );
  }
}
