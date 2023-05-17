declare namespace API {
  //   import type {  } from '@/enums/EUserRole';
  import type { EUserRole } from '@/enums/EUserRole';

  type LoginParams = {
    login: string;
    password: string;
  };
  type ChangePassWithTokenParams = {
    token: string;
    new_password: string;
    confirm_password: string;
  };
  type forgotPassWithEmailParams = {
    login: string;
    email: string;
  };

  type LoginResult = {
    token: string;
  };

  type UserInfo = {
    id: string;
    email: string | null;
    username: string;
    last_sign_in_at: string | null;
    failed_attempts: number;
    locked_at: string | null;
    created_at: string;
    updated_at: string;
    must_change_password: boolean;
    initial_password: string;
    role: EUserRole;
  };
}
