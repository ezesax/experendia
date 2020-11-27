<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExperiencesUsersCrawlersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experiences_users_crawlers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('zone_id')->unsigned()->nullable();
            $table->foreign('zone_id')->references('id')->on('zones');
            $table->integer('experience_id')->unsigned()->nullable();
            $table->foreign('experience_id')->references('id')->on('experiences');
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('photo')->nullable();
            $table->string('email')->nullable();
            $table->string('referrer_url')->nullable();
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
        Schema::dropIfExists('experiences_users_crawlers');
    }
}
