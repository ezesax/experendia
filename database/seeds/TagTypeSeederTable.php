<?php

use Illuminate\Database\Seeder;

class TagTypeSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('tag_types')->insert([
                ['name' => 'Ocupacion', 'slug' => 'ocupacion'],
                ['name' => 'Negocio', 'slug' => 'negocio'],
                ['name' => 'Vida y Conocimiento', 'slug' => 'vida y conocimiento']
            ]

        );
    }
}
