import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuditLogService } from '../../Services/audit-log/audit-log.service';
import { CreateAuditLogDto } from '../../DTOs/AuditDTO/CreateAudit.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, AuditLogResponseDto, ErrorResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';


@ApiExtraModels(AuditLogResponseDto)
@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new audit log' })
          @ApiCreatedResponse({
              description: 'Audit log created successfully',
              schema: {
                  allOf: [
                      { $ref: getSchemaPath(ApiResponseDto) },
                      {
                          properties: {
                              resultData: { $ref: getSchemaPath(AuditLogResponseDto) }
                          }
                      }
                  ]
              }
          })
          @ApiBadRequestResponse({
                  description: 'Invalid input data',
                  type: ErrorResponseDto
              })
  async logAction(
    @Body() createAuditLogDto: CreateAuditLogDto,
  ) {
    const audit = await this.auditLogService.logAction({
      ...createAuditLogDto,
      staffId: new Date(createAuditLogDto.staffId),
    });
    return {
      succeeded: true,
      message: 'Audit log entry created successfully',
      statusCode: 201,
      resultData: audit,
    };
  }

  @ApiBearerAuth()
      @ApiOperation({ summary: 'Get all audit log' })
      @ApiOkResponse({
          description: 'Audit log retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: {
                              type: 'array',
                              items: { $ref: getSchemaPath(AuditLogResponseDto) }
                          }
                      }
                  }
              ]
          }
      })
  @Get()
  async getLogs(){
    const audit = await this.auditLogService.getLogs();
    return {
      succeeded: true,
      message: 'Audit logs retrieved successfully',
      statusCode: 200,
      resultData: audit,
    };
}
}