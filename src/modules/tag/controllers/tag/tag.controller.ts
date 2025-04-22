import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateTagDto } from '../../dtos/CreateTagDto';
import { UpdateTagDto } from '../../dtos/UpdateTagDto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { TagService } from '../../services/tag/tag.service';

@Controller('tag')
export class TagController {
    constructor(private tagService: TagService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    createTag(@Body() createTagDto: CreateTagDto) {
        return this.tagService.createTag(createTagDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getTag() {
        return this.tagService.findTag();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getTagById(@Param('id') id: string) {
        return this.tagService.findTagById(id);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':id')
    async updateTagById(
        @Param('id') id: string,
        @Body() updateTagDto: UpdateTagDto,) {
            await this.tagService.updateTag(id, updateTagDto)
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteTagById(
        @Param('id') id: string) {
            await this.tagService.deleteTag(id);
        }

}
