import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

import { Product } from './Product';
import { User } from './User';

@Table({ tableName: 'inventory' })
export class Inventory extends Model<Inventory> {
    @Default(DataType.UUIDV4)
    @PrimaryKey
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Product)
    products: Product[];
}
