import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  Unique,
  BeforeCreate
} from "sequelize-typescript";
import bcrypt from "bcryptjs";
import env from "../../lib/env";
import { doesNotReject } from "assert";

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

  @BeforeCreate
  static async passwordHash(instance: User) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(instance.passWord, salt);

    instance.passWord = hash;
  }
}
