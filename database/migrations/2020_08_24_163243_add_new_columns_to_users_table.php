<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewColumnsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('facebookid')->nullable();
            $table->string('googleid')->nullable();
            $table->string('linkedinid')->nullable();
            $table->smallInteger('verified')->default(0);
            $table->enum('status', ['Pendiente', 'Desactivado', 'Activo', 'Eliminado']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('facebookid');
            $table->dropColumn('googleid');
            $table->dropColumn('linkedinid');
            $table->dropColumn('verified');
            $table->dropColumn('status');
        });
    }
}
