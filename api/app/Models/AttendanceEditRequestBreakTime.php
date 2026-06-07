<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AttendanceEditRequestBreakTime extends Model
{
    protected $fillable = [
        'attendance_edit_request_id',
        'break_in',
        'break_out',
    ];

    public function attendanceEditRequest(): BelongsTo
    {
        return $this->belongsTo(AttendanceEditRequest::class);
    }
}
