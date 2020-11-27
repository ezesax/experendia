<?php

use Illuminate\Database\Seeder;
use App\Zone;

class ZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $zone = Zone::create([
            'parent_id' => null,
            'name' => 'No definida',
            'slug' => 'no-definida',
            'denomination' => 'Zona no definida',
            'latitude' => '',
            'longitude' => '',
            'status' => 'Activo'
        ]);

        $zone->save();
    }
}
