import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement
} from "sequelize-typescript";

@Table
export class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column content!: string;

  @Column img: string;

  @Column creator!: number;
}
