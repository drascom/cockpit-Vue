<?php

/*
  copy this code to `/config/bootstrap.php`

  When you save an asset, absolute_path and real_path are added automatically.

*/

$app->on('cockpit.assets.save', function(&$assets) use ($app) {

    foreach ($assets as &$asset) {

        // add paths
        $asset['absolute_path'] = $app['site_url'] . $app['base_url'] . '/storage/uploads' . $asset['path'];

        $asset['real_path'] = COCKPIT_DIR . '/storage/uploads' . $asset['path'];

    }

});
if (COCKPIT_API_REQUEST) {

    $app->on('collections.find.after.activities', function($name, &$entries) {

        foreach ($entries as &$entry) {

            if (isset($entry['account'])) {
                // find account
                $account = $this->storage->findOne('cockpit/accounts', ['_id' => $entry['account']]);
                // return account name
                $entry['account'] = !empty($account['group']) ? $account['group'] : $account['user'];
                // return account array
                //$entry['account'] = $account; // caution: unset sensible data first!
            }
        }

    });
}