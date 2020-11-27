<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserPointActionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_point_actions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('register');
            $table->integer('experiences_post');
            $table->integer('response_experiences');
            $table->integer('rate_experience');
            $table->integer('delete_experience');
            $table->integer('daily_access');
            $table->integer('followers');
            $table->integer('following');
            $table->integer('breaches_rules');
            $table->integer('account_lockout');
            $table->smallInteger('founder');
            $table->integer('total_points');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_point_actions');
    }
}
