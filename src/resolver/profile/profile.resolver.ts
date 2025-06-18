import { Query, Resolver } from '@nestjs/graphql';
import { Profile } from 'src/database/entities/Profile.entity';
import { ProfileService } from 'src/Services/profile/profile.service';


@Resolver(() => Profile)
export class ProfileResolver {
    constructor(private profileService: ProfileService) {}

    @Query(() => [Profile], {name: 'profiles'})
    async findTag(): Promise<Profile[]> {
        return this.profileService.findAllProfiles();
    }
}