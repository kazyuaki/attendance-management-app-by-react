<?php

namespace Database\Factories;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AttendanceFactory extends Factory
{
    protected $model = Attendance::class;

    public function definition(): array
    {
        $clocInHour = fake()->numberBetween(8, 10);

        $clockIn = sprintf(
            '%02d:%02d:00', 
            $clocInHour,
            fake()->randomElement([0, 15, 30, 45])
        );

        $clockOut = sprintf(
            '%02d:%02d:00', 
            $clocInHour + 9,
            fake()->randomElement([0, 15, 30, 45])
        );


        return [
            'user_id' => User::factory(),
            'work_date' => fake()
                ->dateTimeBetween('2026-06-01', '2026-06-30')
                ->format('Y-m-d'),
            'clock_in' => $clockIn,
            'clock_out' => $clockOut,
        ];
    }
}