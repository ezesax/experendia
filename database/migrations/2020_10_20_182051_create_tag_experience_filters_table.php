<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagExperienceFiltersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tag_experience_filters', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('experience_id')->unsigned();
            $table->foreign('experience_id')->references('id')->on('experiences');
            $table->integer('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('tags');
            $table->integer('tag_search_id')->unsigned();
            $table->foreign('tag_search_id')->references('id')->on('tag_searches');
            $table->integer('tag_tree_id')->unsigned();
            $table->foreign('tag_tree_id')->references('id')->on('tag_trees');
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
        Schema::dropIfExists('tag_experience_filters');
    }
}
