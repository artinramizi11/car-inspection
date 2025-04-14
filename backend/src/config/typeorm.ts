import * as dotenv from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm";
dotenv.config()


export const TypeOrmConfig = (): DataSourceOptions => ({
  type: "postgres",
  host: "localhost",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASENAME,
  port: 5432,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'], 
  synchronize: false,
  
});

  const dataSource = new DataSource(TypeOrmConfig())
  export default dataSource