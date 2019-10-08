import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement
} from "sequelize-typescript";

@Table
export class Marker extends Model<Marker> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column alcohol!: string;

  @Column Area!: string;

  @Column locationX!: number;

  @Column locationY!: number;

  @Column memberGender!: string;

  @Column memverMaxCount!: number;

  @Column memverCount!: number;

  @Column payment!: string;

  @Column creator!: string;
}
