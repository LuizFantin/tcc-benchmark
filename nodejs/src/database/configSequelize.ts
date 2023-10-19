import { Sequelize } from 'sequelize'

// const dbName = process.env.DB_NAME as string
// const dbUser = process.env.DB_USER as string
// const dbHost = process.env.DB_HOST
// const dbDriver = process.env.DB_DRIVER as Dialect
// const dbPassword = process.env.DB_PASSWORD
const dbName = 'api-multithread'
const dbUser = 'root'
const dbHost = 'localhost'
const dbDriver = 'postgres'
const dbPassword = 'docker'
const dbPort = 5432

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection =  new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      dialect: dbDriver,
      port: dbPort
    })
  }
}

const database: Database = new Database();

export default database;