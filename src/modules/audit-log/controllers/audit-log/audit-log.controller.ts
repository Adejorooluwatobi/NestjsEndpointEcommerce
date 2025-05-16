import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuditLogService } from '../../services/audit-log/audit-log.service';
import { CreateAuditLogDto } from '../../Dtos/CreateAudit.dto';


@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post()
  async logAction(
    @Body() createAuditLogDto: CreateAuditLogDto,
  ) {
    return this.auditLogService.logAction({
      ...createAuditLogDto,
      staffId: new Date(createAuditLogDto.staffId),
    });
  }

  @Get()
  async getLogs(){
    return this.auditLogService.getLogs();
}
}