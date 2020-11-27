<?php

use Illuminate\Database\Seeder;
use \App\LevelPoint;

class LevelPointSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $points  = [100, 500, 1000, 1500];
        $levels = [1, 2, 3, 4];

        for($i = 0; $i < count($points); $i++){
            $e = new LevelPoint();

            $e->points = $points[$i];
            $e->level = $levels[$i];

            $e->save();
        }
    }
}
