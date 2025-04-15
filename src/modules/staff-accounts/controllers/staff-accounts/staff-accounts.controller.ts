import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { StaffAccountsService } from '../../services/staff-accounts/staff-accounts.service';
import { CreateStaffAccountDto } from '../../dtos/CreateStaffAccount.dto';
import { UpdateStaffAccountDto } from '../../dtos/UpdateStaffAccount.dto';


// import { StaffAccountGuard } from 'src/security/auth/guards/staffAccount.guard';

@Controller('staff-accounts')
export class StaffAccountsController {
    constructor(private staffsService: StaffAccountsService) {}

    // @UseGuards(StaffAccountGuard)
    @Get()
    async getStaffs() {
        return this.staffsService.findStaffAccount();
    }

    // @UseGuards(StaffAccountGuard)
    @Get(':id')
    async getStaffById(@Param('id', ParseUUIDPipe) id: string) {
        return this.staffsService.findStaffAccountById(id);
    }

    @Post()
    createStaff(@Body() createStaffDto: CreateStaffAccountDto) {
        return this.staffsService.createStaffAccount(createStaffDto);
    }

    // @UseGuards(StaffAccountGuard)
    @Put(':id')
    async updateStaffById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateStaffDto: UpdateStaffAccountDto,) {
            await this.staffsService.updateStaffAccount(id, updateStaffDto);
    }

    
    // @UseGuards(StaffAccountGuard)
    @Delete(':id')
    async deleteStaffById(
        @Param('id', ParseUUIDPipe) id: string) {
        await this.staffsService.deleteStaffAccount(id);
    }
}