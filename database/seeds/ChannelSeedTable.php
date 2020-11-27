<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChannelSeedTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('channels')->insert([
                ['name' => 'Vida', 'slug' => 'vida', 'parent_id'    => null, 'status' => 'Activo'],
                ['name' => 'Conocimiento', 'slug' => 'conocimiento', 'parent_id'    => null, 'status' => 'Activo'],
                ['name' => 'Negocio', 'slug' => 'negocio', 'parent_id'  => null, 'status' => 'Activo']
            ]

        );
    }
}
