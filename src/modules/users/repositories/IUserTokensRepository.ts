import UserToken from '../infra/typeorm/entities/UserTokes';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(tokes: string): Promise<UserToken | undefined>;
}
