<?php

use Illuminate\Database\Seeder;
use \App\UserProfileDataValue;

class UserProfileDataValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items  = ['firstname', 'lastname', 'nationality', 'email', 'password', 'interests', 'knowledge', 'photo_perfil', 'date_birth', 'sex', 'founder'];
        $values = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 50];

        for($i = 0; $i < count($items); $i++){
            $e = new UserProfileDataValue();

            $e->item = $items[$i];
            $e->value = $values[$i];

            $e->save();
        }

    }
}
