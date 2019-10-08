import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement
} from "sequelize-typescript";

@Table
export class Chat extends Model<Chat> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column content!: string;

  @Column marker!: number;

  @Column creator!: number;
}
