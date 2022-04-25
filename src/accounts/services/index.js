import Account from '../entities/Account';

export default {
  registerAccount: async  (firstName, lastName, email, password, {accountRepository, authenticator}) => {
    password = await authenticator.encrypt(password);
    const account = new Account(undefined, firstName, lastName, email, password);
    return accountRepository.persist(account);
  },
  getAccount: (accountId, {accountRepository}) => {
    return accountRepository.get(accountId);
  },
  find: ({accountRepository})=>{
    return accountRepository.find();
  },
  findByEmail: (email, {accountRepository})=>{
    return accountRepository.getByEmail(email);
  },

  authenticate: async (email, password, { accountRepository, authenticator, tokenManager }) => {
    // console.log(password)
    const account = await accountRepository.getByEmail(email);

    const result = await authenticator.compare(password, account.password);
    if (!result) {
      throw new Error('Bad credentials');
    }
    const token = tokenManager.generate({ email: account.email });
    return token;
  }
};