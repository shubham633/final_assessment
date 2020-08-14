export const UserSchema = {
  name: 'signup',
  primaryKey: 'email',
  properties:
  {
    name: 'string',
    email: 'string',
    mobile: 'string',
    password: 'string',
  }
}
