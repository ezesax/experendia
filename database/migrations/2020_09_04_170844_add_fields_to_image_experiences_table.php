<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsToImageExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('image_experiences', function (Blueprint $table) {
            $table->smallInteger('main')->nullable();
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('image_experiences', function (Blueprint $table) {
            $table->dropColumn('main');
            $table->dropColumn('width');
            $table->dropColumn('height');
        });
    }
}
