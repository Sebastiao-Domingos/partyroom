import Cookies from 'js-cookie';

class TokenService {
  private static readonly API_TOKEN_PART1 = '_done';
  private static readonly API_TOKEN_PART2 = '_had';
  private static readonly API_TOKEN_PART3 = '_bouth';

  private constructor() {}

  static saveToken(token: string) {
    const [p1, p2, p3] = token.split(',');

    Cookies.set(TokenService.API_TOKEN_PART1, p1, {
      httpOnly: true,
      sameSite: 'lax',
      priority: 'medium',
    });

    Cookies.set(TokenService.API_TOKEN_PART2, p2, {
      httpOnly: true,
      sameSite: 'lax',
      priority: 'medium',
    });

    Cookies.set(TokenService.API_TOKEN_PART3, p3, {
      httpOnly: true,
      sameSite: 'lax',
      priority: 'medium',
    });
  }

  static getToken() {
    const [p1, p2, p3] = [
      Cookies.get(TokenService.API_TOKEN_PART1),
      Cookies.get(TokenService.API_TOKEN_PART2),
      Cookies.get(TokenService.API_TOKEN_PART3),
    ];

    if (!p1 || !p2 || !p3) {
      return null;
    }
    return `${p1}.${p2}.${p3}`;
  }

  static removeToken() {
    Cookies.remove(TokenService.API_TOKEN_PART1);
    Cookies.remove(TokenService.API_TOKEN_PART2);
    Cookies.remove(TokenService.API_TOKEN_PART3);
  }
}

export { TokenService };
