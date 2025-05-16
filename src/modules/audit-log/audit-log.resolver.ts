import { Query, Resolver } from '@nestjs/graphql';
import { AuditLog } from 'src/database/entities/auditLog.entity';
import { AuditLogService } from './services/audit-log/audit-log.service';


@Resolver(() => AuditLog)
export class AuditLogResolver {
    constructor(private auditLogService: AuditLogService) {}

    @Query(() => [AuditLog], {name: 'auditLog'})
    async findAuditLog(): Promise<AuditLog[]> {
        return this.auditLogService.getLogs();
    }
}
