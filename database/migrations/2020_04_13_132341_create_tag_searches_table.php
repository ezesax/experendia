<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagSearchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tag_searches', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tag_tree_id')->unsigned();
            $table->foreign('tag_tree_id')->references('id')->on('tag_trees');
            $table->bigInteger('branch_id');
            $table->string('tag');
            $table->string('tree');
            $table->enum('status', ['Pendiente', 'Desactivado', 'Activo', 'Eliminado']);
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
        Schema::dropIfExists('tag_searches');
    }
}
