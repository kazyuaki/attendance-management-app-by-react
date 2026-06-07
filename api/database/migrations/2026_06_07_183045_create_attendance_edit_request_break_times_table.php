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
        Schema::create('attendance_edit_request_break_times', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attendance_edit_request_id');
            $table->foreign('attendance_edit_request_id', 'aer_break_times_request_id_fk')
                ->references('id')
                ->on('attendance_edit_requests')
                ->cascadeOnDelete();
            $table->time('break_in');
            $table->time('break_out')
                ->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_edit_request_break_times');
    }
};
