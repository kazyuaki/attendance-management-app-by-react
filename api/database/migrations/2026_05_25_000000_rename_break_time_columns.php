<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasColumn('break_times', 'break_start') && !Schema::hasColumn('break_times', 'break_in')) {
            Schema::table('break_times', function (Blueprint $table) {
                $table->renameColumn('break_start', 'break_in');
            });
        }

        if (Schema::hasColumn('break_times', 'break_end') && !Schema::hasColumn('break_times', 'break_out')) {
            Schema::table('break_times', function (Blueprint $table) {
                $table->renameColumn('break_end', 'break_out');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('break_times', 'break_in') && !Schema::hasColumn('break_times', 'break_start')) {
            Schema::table('break_times', function (Blueprint $table) {
                $table->renameColumn('break_in', 'break_start');
            });
        }

        if (Schema::hasColumn('break_times', 'break_out') && !Schema::hasColumn('break_times', 'break_end')) {
            Schema::table('break_times', function (Blueprint $table) {
                $table->renameColumn('break_out', 'break_end');
            });
        }
    }
};
