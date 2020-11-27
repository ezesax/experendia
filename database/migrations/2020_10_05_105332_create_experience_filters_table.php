<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExperienceFiltersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experience_filters', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title')->nullable();
            $table->longText('description')->nullable();
            $table->string('tag_aliases')->nullable();
            $table->smallInteger('userLevel')->nullable();
            $table->integer('channel_id')->unsigned();
            $table->integer('experience_id')->unsigned();
            $table->integer('tag_search_id')->unsigned();
            $table->integer('tag_id')->unsigned();
            $table->integer('rating');
            $table->integer('hits');
            $table->foreign('channel_id')->references('id')->on('channels');
            $table->foreign('experience_id')->references('id')->on('experiences');
            $table->foreign('tag_search_id')->references('id')->on('tag_searches');
            $table->foreign('tag_id')->references('id')->on('tags');
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
        Schema::dropIfExists('experience_filters');
    }
}
