<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExperienceTagSuggestedActionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experience_tag_suggested_actions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tag_suggested_id')->unsigned();
            $table->integer('experience_id')->unsigned();
            $table->enum('action', ['add', 'remove'])->nullable();
            $table->foreign('tag_suggested_id')->references('id')->on('experience_tag_suggesteds');
            $table->foreign('experience_id')->references('id')->on('experiences');
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
        Schema::dropIfExists('experience_tag_suggested_actions');
    }
}
