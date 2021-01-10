import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
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

    @HasMany(() => Product)
    products: Product[];

    @ForeignKey(() => User)
    @PrimaryKey
    @Column(DataType.UUID)
    userId: string;

    @BelongsTo(() => User)
    user: User;
}

export default Inventory;
