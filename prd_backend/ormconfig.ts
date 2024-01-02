import { User } from "src/auth/entities/auth.entity";
import { SubscriptionPackage } from "src/subscription/entities/sub.entities";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    database: "PRD_Final",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: '1234',
    entities: [SubscriptionPackage, User],
    synchronize: true
}

export default config;