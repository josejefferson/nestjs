import { DataSource, DataSourceOptions } from 'typeorm'

export const ormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/database.sqlite',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true
}

const dataSource = new DataSource(ormConfig)
export default dataSource
