<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('zone_id')->unsigned();
            $table->foreign('zone_id')->references('id')->on('zones');
            $table->integer('nationality_id')->default(0);
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('username')->nullable();
            $table->text('description')->nullable();
            $table->string('phone')->nullable();
            $table->string('photo')->nullable();
            $table->date('birthdate')->nullable();
            $table->enum('sex', ['Hombre', 'Mujer', 'Neutro'])->nullable();
            $table->smallInteger('public')->default(1);
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
        Schema::dropIfExists('user_profiles');
    }
}
