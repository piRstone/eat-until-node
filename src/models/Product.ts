import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

import { Inventory } from './Inventory';
import { User } from './User';

@Table({ tableName: 'product' })
export class Product extends Model<Product> {
    @Default(DataType.UUIDV4)
    @PrimaryKey
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    expiration_date: Date;

    @Column(DataType.INTEGER)
    notification_delay: number;

    @Column(DataType.STRING)
    ean13: string;

    @Column(DataType.DATE)
    notification_date: Date;

    @ForeignKey(() => Inventory)
    @PrimaryKey
    @Column
    inventoryId: string;

    @ForeignKey(() => User)
    @PrimaryKey
    @Column(DataType.UUID)
    userId: string;

    @BelongsTo(() => Inventory)
    inventory: Inventory;

    @BelongsTo(() => User)
    user: User;
}

export default Product;
