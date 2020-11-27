<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class LifeAndKnowledgeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Artisan::call('command:life_and_knowledge');
    }
}
