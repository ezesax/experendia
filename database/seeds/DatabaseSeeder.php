<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        //$this->call(ZoneSeeder::class);
        $this->call(UserSeedTable::class);
        $this->call(ChannelSeedTable::class);
        $this->call(TagTypeSeederTable::class);
        $this->call(OccupationTableSeeder::class);
        $this->call(BusinessAndBrandsTableSeeder::class);
        $this->call(LifeAndKnowledgeTableSeeder::class);
        $this->call(LevelPointSeeder::class);
        $this->call(PointSeeder::class);
        $this->call(UserProfileDataValueSeeder::class);
    }
}
