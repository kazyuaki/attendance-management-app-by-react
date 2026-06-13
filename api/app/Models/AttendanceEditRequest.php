<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AttendanceEditRequest extends Model
{
    protected $fillable = [
        'attendance_id',
        'user_id',
        'clock_in',
        'clock_out',
        'note',
        'status',
        'rejected_reason',
    ];

    public function attendance(): BelongsTo
    {
        return $this->belongsTo(Attendance::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function breakTimes(): HasMany
    {
        return $this->hasMany(AttendanceEditRequestBreakTime::class);
    }
}
