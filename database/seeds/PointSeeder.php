<?php

use Illuminate\Database\Seeder;
use \App\Point;

class PointSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items  = ['experiences_post', 'responses_experiences', 'rate_experience', 'delete_experience', 'daily_access', 'followers', 'following', 'breaches_rules', 'account_lockout', 'founder', 'register'];
        $values = ['10', '5', '1', '-2', '1', '5', '2', '-10', '-20', '50', '10'];

        for($i = 0; $i < count($items); $i++){
            $e = new Point();

            $e->item = $items[$i];
            $e->value = $values[$i];

            $e->save();
        }
    }
}
