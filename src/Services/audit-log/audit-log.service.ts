import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from 'src/database/entities/auditLog.entity';
import { CreateAuditLogParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async logAction(createAuditLogDetails: CreateAuditLogParams
  ) {
    const log = this.auditLogRepository.create({ 
      ...createAuditLogDetails, 
      userId: String(createAuditLogDetails.userId),
      staffId: String(createAuditLogDetails.staffId), 
      createdAt: new Date() 
    });
    const savedLog = await this.auditLogRepository.save(log);
    return this.auditLogRepository.save(savedLog);
  }

  async getLogs() {
    const query = this.auditLogRepository.createQueryBuilder('auditLog');
    query.select([
      'auditLog.id',
      'auditLog.action',
      'auditLog.userId',
      'auditLog.staffId',
      'auditLog.createdAt',
    ]);
    return query.getMany();
  }
}