<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tag_experiences', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('channel_id')->unsigned();
            $table->foreign('channel_id')->references('id')->on('channels');
            $table->integer('tag_search_id')->unsigned();
            $table->foreign('tag_search_id')->references('id')->on('tag_searches');
            $table->integer('tag_root_id')->unsigned();
            $table->foreign('tag_root_id')->references('id')->on('tags');
            $table->integer('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('tags');
            $table->string('tag');
            $table->integer('hits');
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
        Schema::dropIfExists('tag_experiences');
    }
}
