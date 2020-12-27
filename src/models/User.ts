import {
    AllowNull,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class User extends Model<User> {
    @Default(DataType.UUIDV4)
    @PrimaryKey
    @Column(DataType.UUID)
    id: string;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @Default(null)
    @Column(DataType.UUID)
    signupToken: string | null;

    @Default(null)
    @Column(DataType.STRING)
    password: string | null;

    @Default(null)
    @Column(DataType.DATE)
    passwordExpiry: Date | null;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isAdmin: boolean;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isActive: boolean;

    @Column(DataType.STRING)
    public refreshToken: string | null;

    @Column(DataType.DATE)
    public refreshTokenExpiry: Date | null;

    get fullName(): string {
        return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
    }
}

export default User;
