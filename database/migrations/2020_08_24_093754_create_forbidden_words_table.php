<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateForbiddenWordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forbidden_words', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
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
        Schema::dropIfExists('forbidden_words');
    }
}
