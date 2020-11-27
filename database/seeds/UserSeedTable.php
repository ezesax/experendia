<?php

use App\User;
use App\UserProfile;
use App\Zone;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeedTable extends Seeder
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

        //
        #Creo los roles del sistema
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'User']);
        Role::create(['name' => 'Moderator']);

        #Creo el usurio admin
        $user = User::create([

            'name'      => 'Admin',
            'email'     => 'admin@experendia.com',
            'password'  => bcrypt('secret'),
        ]);
        $user->assignRole('Admin');
        $user->save();
        $profile = UserProfile::create([
            'user_id' => $user->id,
            'zone_id' => 1,
            'nationality_id' => 1,
            'firstname' => 'Usuario',
            'lastname' => 'Administrador',
            'username' => 'usuario.administrador',
            'description' => 'Internal admin user',
            'phone' => '+5491169552336',
            'photo' => 'storage/IMAGES/PROFILE/fakepath',
            'birthdate' => '1990-10-01',
            'sex' => 'Hombre',
            'public' => '1'
        ]);
        $profile->save();

        #Creo el usurio moderator
        $user = User::create([

            'name'      => 'Moderator',
            'email'     => 'moderator@experendia.com',
            'password'  => bcrypt('secret'),
        ]);
        $user->assignRole('Moderator');
        $user->save();
        $profile = UserProfile::create([
            'user_id' => $user->id,
            'zone_id' => 1,
            'nationality_id' => 1,
            'firstname' => 'Usuario',
            'lastname' => 'Moderador',
            'username' => 'usuario.moderador',
            'description' => 'Internal moderator user',
            'phone' => '+5491169552336',
            'photo' => 'storage/IMAGES/PROFILE/fakepath',
            'birthdate' => '1990-10-01',
            'sex' => 'Hombre',
            'public' => '1'
        ]);
        $profile->save();

        #Creo el usurio user para pruebas
        $user = User::create([

            'name'      => 'User',
            'email'     => 'user@experendia.com',
            'password'  => bcrypt('secret'),
        ]);
        $user->assignRole('User');
        $user->save();
        $profile = UserProfile::create([
            'user_id' => $user->id,
            'zone_id' => 1,
            'nationality_id' => 1,
            'firstname' => 'Usuario',
            'lastname' => 'Basico',
            'username' => 'usuario.basico',
            'description' => 'Internal basic user',
            'phone' => '+5491169552336',
            'photo' => 'storage/IMAGES/PROFILE/fakepath',
            'birthdate' => '1990-10-01',
            'sex' => 'Hombre',
            'public' => '1'
        ]);
        $profile->save();
    }
}
