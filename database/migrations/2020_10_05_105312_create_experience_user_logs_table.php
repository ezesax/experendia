<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExperienceUserLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experience_user_logs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('experience_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->smallInteger('device')->nullable();
            $table->string('ip')->nullable();
            $table->string('useragent')->nullable();
            $table->enum('action', ['add', 'disabled', 'remove', 'modified'])->nullable();
            $table->foreign('experience_id')->references('id')->on('experiences');
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('experience_user_logs');
    }
}
