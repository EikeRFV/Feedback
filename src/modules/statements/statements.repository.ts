import { Injectable } from '@nestjs/common';
import { Statement } from '../../common/entities/statement.entity';

@Injectable()
export class StatementsRepository {
  async findAll(userId?: string) {
    return Statement.findAll({
      where: userId ? { userId } : undefined,
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string) {
    return Statement.findOne({
      where: { id },
    });
  }

  async create(data: Partial<Statement>) {
    return Statement.create({
      userId: data.userId,
      amount: data.amount,
      type: data.type,
      status: data.status,
      description: data.description,
      referenceId: data.referenceId,
      referenceType: data.referenceType,
      metadata: data.metadata,
    });
  }

  async update(id: string, data: Partial<Statement>) {
    await Statement.update(
      {
        status: data.status,
        metadata: data.metadata,
      },
      {
        where: { id },
      },
    );

    return this.findOne(id);
  }

  async delete(id: string) {
    await Statement.destroy({
      where: { id },
    });
  }
}
