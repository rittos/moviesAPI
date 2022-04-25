import Account from '../entities/Account';

export default {
  registerAccount: async  (firstName, lastName, email, password, {accountRepository}) => {
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
  }
};