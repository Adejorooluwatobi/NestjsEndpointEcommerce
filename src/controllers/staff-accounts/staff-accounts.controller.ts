import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/security/auth/guards/user.guard';
import { StaffGuard } from 'src/security/auth/guards';
import { StaffAccountsService } from 'src/Services/staff-accounts/staff-accounts.service';
import { CreateStaffAccountDto } from 'src/DTOs/StaffAccountDTO/CreateStaffAccount.dto';
import { UpdateStaffAccountDto } from 'src/DTOs/StaffAccountDTO/UpdateStaffAccount.dto';

@Controller('staff-accounts')
export class StaffAccountsController {
    constructor(private staffsService: StaffAccountsService) {}

    @UseGuards(UserGuard)
    @Get()
    async getStaffs() {
        return this.staffsService.findStaffAccount();
    }

    @UseGuards(StaffGuard)
    @Get(':id')
    async getStaffById(@Param('id', ParseUUIDPipe) id: string) {
        return this.staffsService.findStaffAccountById(id);
    }

    @UseGuards(UserGuard)
    @Post()
    createStaff(@Body() createStaffDto: CreateStaffAccountDto) {
        return this.staffsService.createStaffAccount(createStaffDto);
    }

    @UseGuards(StaffGuard)
    @Put(':id')
    async updateStaffById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateStaffDto: UpdateStaffAccountDto,) {
            await this.staffsService.updateStaffAccount(id, updateStaffDto);
            return this.staffsService.findStaffAccountById(id);
    }

    
    @UseGuards(UserGuard)
    @Delete(':id')
    async deleteStaffById(
        @Param('id', ParseUUIDPipe) id: string) {
        const result = await this.staffsService.deleteStaffAccount(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'staff Account deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}