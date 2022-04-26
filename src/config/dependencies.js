import AccountsRepositoryInMemory from '../accounts/repositories/in-memory/AccountRepository';

const buildDependencies = () => {
  const dependencies = {
  };

  if (process.env.DATABASE_DIALECT === "in-memory") {
    dependencies.accountRepository = new AccountsRepositoryInMemory();
  } else if (process.env.DATABASE_DIALECT === "mongo") {
    dependencies.accountRepository = new AccountsRepositoryMongo();
  } else if (process.env.DATABASE_DIALECT === "mysql") {
    throw new Error('Add MySQL support');
  } else {
    throw new Error('Add DB Support to project');
  }
  return dependencies;
};

export default buildDependencies;