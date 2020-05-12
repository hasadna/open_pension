<?php

namespace Drupal\open_pension_fetcher\Commands;

use Consolidation\OutputFormatters\StructuredData\RowsOfFields;
use Drupal\open_pension_fetcher\OpenPensionFetcherService;
use Drush\Commands\DrushCommands;

/**
 * A Drush commandfile.
 *
 * In addition to this file, you need a drush.services.yml
 * in root of your module, and a composer.json file that provides the name
 * of the services file to use.
 *
 * See these files for an example of injecting Drupal services:
 *   - http://cgit.drupalcode.org/devel/tree/src/Commands/DevelCommands.php
 *   - http://cgit.drupalcode.org/devel/tree/drush.services.yml
 */
class OpenPensionFetcherCommands extends DrushCommands {

  public function __construct(OpenPensionFetcherService $fetcher_query) {
    $this->fetchQueryService = $fetcher_query;
  }

  /**
   * Collecting the files via Drush.
   *
   * @command open_pension_fetcher:get_links_files
   */
  public function commandName() {
    $results = json_decode($this->fetchQueryService->collectLinks());

    if (!empty($results->data->completeFilesCollecting->errors)) {

      foreach ($results->data->completeFilesCollecting->errors as $error) {
        $this->io()->error($error);
        $this->logger()->error($error);
      }

      return;
    }

    $this->logger()->info($results->data->completeFilesCollecting->links[0]);
    $this->io()->success($results->data->completeFilesCollecting->links[0]);
  }
}
