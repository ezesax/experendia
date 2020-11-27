<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class BusinessAndBrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Artisan::call('command:business_and_brands');
    }
}
