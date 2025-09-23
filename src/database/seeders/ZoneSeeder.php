<?php
// database/seeders/ZoneSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Zone;

class ZoneSeeder extends Seeder
{
    public function run(): void
    {
        $zones = [
            [
                'name' => 'Toronto Metro',
                'code' => 'TOR',
                'description' => 'Greater Toronto Area - GTA region with high delivery volume',
                'postal_codes' => json_encode(['M1A', 'M1B', 'M1C', 'M1E', 'M1G', 'M1H', 'M1J', 'M1K', 'M1L', 'M1M', 'M1N', 'M1P', 'M1R', 'M1S', 'M1T', 'M1V', 'M1W', 'M1X']),
                'cities' => json_encode(['Toronto', 'Mississauga', 'Brampton', 'Markham', 'Vaughan', 'Richmond Hill', 'Oakville', 'Burlington']),
                'provinces' => json_encode(['ON']),
                'base_rate' => 15.00,
                'is_active' => true
            ],
            [
                'name' => 'Montreal Metro',
                'code' => 'MTL',
                'description' => 'Montreal Metropolitan Area - Quebec\'s largest metro region',
                'postal_codes' => json_encode(['H1A', 'H1B', 'H1C', 'H1E', 'H1G', 'H1H', 'H1J', 'H1K', 'H1L', 'H1M', 'H1N', 'H1P', 'H1R', 'H1S', 'H1T', 'H1V', 'H1W', 'H1X']),
                'cities' => json_encode(['Montreal', 'Laval', 'Longueuil', 'Terrebonne', 'Brossard', 'Saint-Jean-sur-Richelieu', 'Repentigny', 'Dollard-des-Ormeaux']),
                'provinces' => json_encode(['QC']),
                'base_rate' => 18.00,
                'is_active' => true
            ],
            [
                'name' => 'Vancouver Metro',
                'code' => 'VAN',
                'description' => 'Metro Vancouver Area - Lower Mainland region',
                'postal_codes' => json_encode(['V5A', 'V5B', 'V5C', 'V5E', 'V5G', 'V5H', 'V5J', 'V5K', 'V5L', 'V5M', 'V5N', 'V5P', 'V5R', 'V5S', 'V5T', 'V5V', 'V5W', 'V5X']),
                'cities' => json_encode(['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Coquitlam', 'Langley', 'North Vancouver', 'West Vancouver']),
                'provinces' => json_encode(['BC']),
                'base_rate' => 20.00,
                'is_active' => true
            ],
            [
                'name' => 'Calgary Metro',
                'code' => 'CAL',
                'description' => 'Calgary Metropolitan Area - Alberta\'s economic hub',
                'postal_codes' => json_encode(['T1A', 'T1B', 'T1C', 'T1E', 'T1G', 'T1H', 'T1J', 'T1K', 'T1L', 'T1M', 'T1N', 'T1P', 'T1R', 'T1S', 'T1X', 'T1Y']),
                'cities' => json_encode(['Calgary', 'Airdrie', 'Cochrane', 'Chestermere', 'Okotoks', 'Strathmore']),
                'provinces' => json_encode(['AB']),
                'base_rate' => 16.00,
                'is_active' => true
            ],
            [
                'name' => 'Edmonton Metro',
                'code' => 'EDM',
                'description' => 'Edmonton Metropolitan Area - Capital region of Alberta',
                'postal_codes' => json_encode(['T5A', 'T5B', 'T5C', 'T5E', 'T5G', 'T5H', 'T5J', 'T5K', 'T5L', 'T5M', 'T5N', 'T5P', 'T5R', 'T5S', 'T5T', 'T5V', 'T5W', 'T5X']),
                'cities' => json_encode(['Edmonton', 'Sherwood Park', 'St. Albert', 'Spruce Grove', 'Leduc', 'Fort Saskatchewan']),
                'provinces' => json_encode(['AB']),
                'base_rate' => 16.00,
                'is_active' => true
            ],
            [
                'name' => 'Ottawa Metro',
                'code' => 'OTT',
                'description' => 'National Capital Region - Ottawa-Gatineau area',
                'postal_codes' => json_encode(['K1A', 'K1B', 'K1C', 'K1E', 'K1G', 'K1H', 'K1J', 'K1K', 'K1L', 'K1M', 'K1N', 'K1P', 'K1R', 'K1S', 'K1T', 'K1V', 'K1W', 'K1X']),
                'cities' => json_encode(['Ottawa', 'Gatineau', 'Kanata', 'Orleans', 'Nepean', 'Gloucester', 'Hull']),
                'provinces' => json_encode(['ON', 'QC']),
                'base_rate' => 17.00,
                'is_active' => true
            ],
            [
                'name' => 'Winnipeg Metro',
                'code' => 'WPG',
                'description' => 'Winnipeg Metropolitan Area - Manitoba\'s capital region',
                'postal_codes' => json_encode(['R2A', 'R2B', 'R2C', 'R2E', 'R2G', 'R2H', 'R2J', 'R2K', 'R2L', 'R2M', 'R2N', 'R2P', 'R2R', 'R2V', 'R2W', 'R2X']),
                'cities' => json_encode(['Winnipeg', 'East St. Paul', 'West St. Paul', 'Selkirk', 'Steinbach']),
                'provinces' => json_encode(['MB']),
                'base_rate' => 14.00,
                'is_active' => true
            ],
            [
                'name' => 'Halifax Metro',
                'code' => 'HAL',
                'description' => 'Halifax Regional Municipality - Atlantic Canada\'s largest metro',
                'postal_codes' => json_encode(['B2A', 'B2B', 'B2C', 'B2E', 'B2G', 'B2H', 'B2J', 'B2K', 'B2L', 'B2M', 'B2N', 'B2P', 'B2R', 'B2S', 'B2T', 'B2V', 'B2W', 'B2X']),
                'cities' => json_encode(['Halifax', 'Dartmouth', 'Bedford', 'Sackville', 'Eastern Passage', 'Cole Harbour']),
                'provinces' => json_encode(['NS']),
                'base_rate' => 19.00,
                'is_active' => true
            ]
        ];

        foreach ($zones as $zone) {
            Zone::create($zone);
        }
    }
}