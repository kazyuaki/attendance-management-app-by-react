<?php

namespace Database\Factories;

use App\Models\Attendance;
use App\Models\BreakTime;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class BreakTimeFactory extends Factory
{
    protected $model = BreakTime::class;

    public function definition(): array
    {
        $breakIn = Carbon::createFromTime(12, 0)
            ->addMinutes(fake()->randomElement([0, 5, 10, 15]));

        $breakMinutes = fake()->randomElement([45, 50, 55, 60]);

        $breakOut = $breakIn->copy()->addMinutes($breakMinutes);

        if ($breakOut->gt(Carbon::createFromTime(13, 0))) {
            $breakOut = Carbon::createFromTime(13, 0);
        }

        return [
            'attendance_id' => Attendance::factory(),
            'break_in' => $breakIn->format('H:i:s'),
            'break_out' => $breakOut->format('H:i:s'),
        ];
    }
}
