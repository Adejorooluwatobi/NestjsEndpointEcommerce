import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { StaffAccountsService } from '../../services/staff-accounts/staff-accounts.service';
import { CreateStaffAccountDto } from '../../dtos/CreateStaffAccount.dto';
import { UpdateStaffAccountDto } from '../../dtos/UpdateStaffAccount.dto';
import { UserGuard } from 'src/security/auth/guards/user.guard';


// import { StaffAccountGuard } from 'src/security/auth/guards/staffAccount.guard';

@Controller('staff-accounts')
export class StaffAccountsController {
    constructor(private staffsService: StaffAccountsService) {}

    @UseGuards(UserGuard)
    @Get()
    async getStaffs() {
        return this.staffsService.findStaffAccount();
    }

    @UseGuards(UserGuard)
    @Get(':id')
    async getStaffById(@Param('id', ParseUUIDPipe) id: string) {
        return this.staffsService.findStaffAccountById(id);
    }

    @UseGuards(UserGuard)
    @Post()
    createStaff(@Body() createStaffDto: CreateStaffAccountDto) {
        return this.staffsService.createStaffAccount(createStaffDto);
    }

    @Put(':id')
    async updateStaffById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateStaffDto: UpdateStaffAccountDto,) {
            await this.staffsService.updateStaffAccount(id, updateStaffDto);
    }

    
    @UseGuards(UserGuard)
    @Delete(':id')
    async deleteStaffById(
        @Param('id', ParseUUIDPipe) id: string) {
        await this.staffsService.deleteStaffAccount(id);
    }
}