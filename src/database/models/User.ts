import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement
} from "sequelize-typescript";

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column name: string;
}
