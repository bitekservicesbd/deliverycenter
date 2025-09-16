<?php

use App\Models\CentralAppSetting;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

if (! function_exists('updateEnv')) {
    function updateEnv(array $data)
    {
        $envFile = app()->environmentFilePath();
        $envData = File::get($envFile);

        foreach ($data as $key => $value) {
            if (strpos($value, ' ') !== false) {
                $value = '"'.trim($value).'"';
            } else {
                $value = trim($value);
            }
            $keyPattern = '/^'.preg_quote($key).'=.*/m';
            if (preg_match($keyPattern, $envData)) {
                $envData = preg_replace($keyPattern, $key.'='.$value, $envData);
            } else {
                $envData = rtrim($envData)."\n".$key.'='.$value;
            }
        }
        File::put($envFile, $envData);
    }
}

if (! function_exists('centralDB')) {
    function centralDB()
    {
        $default_database = Config::get('database.default');
        $database_type = $default_database == 'tenant' ? 'mysql' : $default_database;

        return DB::connection($database_type);
    }
}

if (! function_exists('getFavIcon')) {
    function getFavIcon()
    {
        $favIconPath = centralDB()->table('central_app_settings')->first();
        if ($favIconPath && $favIconPath->favicon) {
            $favicon = Storage::url($favIconPath->favicon);

            return $favicon;
        }

        return null;
    }
}

if (! function_exists('getAppLogo')) {
    function getAppLogo()
    {
        $appLogoPath = centralDB()->table('central_app_settings')->first();
        if ($appLogoPath && $appLogoPath->app_logo) {
            $appLogo = Storage::url($appLogoPath->app_logo);

            return $appLogo;
        }

        return null;
    }
}
if (! function_exists('centralAppSetting')) {
    function centralAppSetting()
    {
        return CentralAppSetting::first();
    }
}

if (! function_exists('tenantDB')) {
    function tenantDB($tenantId)
    {
        $tenant = DB::table('tenants')->where('id', $tenantId)->first();

        if (! $tenant) {
            abort(404, 'Tenant not found');
        }
        $tenantDatabaseName = $tenant->id ?? null;

        if (! $tenantDatabaseName) {
            abort(500, 'Tenant database name not found');
        }
        $mysqlConfig = config('database.connections.mysql');
        $mysqlConfig['database'] = $tenantDatabaseName;
        Config::set("database.connections.tenant_{$tenantId}", $mysqlConfig);

        return DB::connection("tenant_{$tenantId}");
    }
}
