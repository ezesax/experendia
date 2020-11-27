<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExperienceTagSearchTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experience_tag_search', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('experience_id')->unsigned();
            $table->foreign('experience_id')->references('id')->on('experiences');
            $table->integer('tag_search_id')->unsigned();
            $table->foreign('tag_search_id')->references('id')->on('tag_searches');
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
        Schema::dropIfExists('experience_tag_search');
    }
}
