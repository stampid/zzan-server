import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement
} from "sequelize-typescript";

@Table
export class Comment extends Model<Comment> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column content!: string;

  @Column creator!: number;
}
