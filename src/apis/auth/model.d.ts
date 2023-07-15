declare namespace API {
    import type { EUserRole } from '@/enums/user';
    //FIXME: this import not working
    interface LoginRqBody {
        login: string;
        password: string;
    }
    interface ChangePassByTokenRqBody {
        token: string;
        new_password: string;
        confirm_password: string;
    }
    interface ChangePassByEmailRqBody {
        login: string;
        email: string;
    }

    interface ResToken {
        token: string;
    }

    interface UserInfo {
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
    }
}
