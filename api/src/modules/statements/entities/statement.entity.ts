
import { Optional } from 'sequelize';

export enum StatementType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum StatementStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export interface StatementAttributes {
  id: string;
  userId: string;
  amount: string;
  type: StatementType;
  status: StatementStatus;
  description: string;
  referenceId?: string;
  referenceType?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export type StatementAttributesCreation = Optional<
  StatementAttributes,
  | 'id'
  | 'referenceId'
  | 'referenceType'
  | 'metadata'
  | 'createdAt'
  | 'updatedAt'
>;


import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '@/modules/users/entities/user.entity';

@Table({
  tableName: 'statements',
})
export class Statement extends Model<
  StatementAttributes,
  StatementAttributesCreation
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: DataType.UUID,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: string;

  @Column({
    type: DataType.ENUM(...Object.values(StatementType)),
    allowNull: false,
  })
  type: StatementType;

  @Column({
    type: DataType.ENUM(...Object.values(StatementStatus)),
    allowNull: false,
  })
  status: StatementStatus;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    field: 'reference_id',
    type: DataType.UUID,
  })
  referenceId?: string;

  @Column({
    field: 'reference_type',
    type: DataType.STRING,
  })
  referenceType?: string;

  @Column({
    type: DataType.JSONB,
  })
  metadata?: Record<string, any>;

  @Column(DataType.DATE)
  declare createdAt: Date;

  @Column(DataType.DATE)
  declare updatedAt: Date;
}
