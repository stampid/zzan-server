import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  Unique
} from "sequelize-typescript";

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @Column
  email!: string;

  @Column nickName!: string;

  @Column passWord!: string;

  @Column provider!: string;

  @Column profileImg!: string;

  @Column gender!: string;

  @Column marker: string;

  @Column birth!: string;

  @Column persona!: string;

  @Column introduce: string;
}
