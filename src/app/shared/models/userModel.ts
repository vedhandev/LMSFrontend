export class UserModel {
  _id: string;
  user_role: string;

  password: string;
  mobile: string;

  name: string;

  public static initialize() {
    const blank = {
      _id: '',
      user_role: '',

      password: '',
      mobile: '',

      name: '',
    };
    return blank;
  }
}
