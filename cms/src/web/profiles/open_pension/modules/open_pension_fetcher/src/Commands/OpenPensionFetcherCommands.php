<?php

namespace Drupal\open_pension_fetcher\Commands;

use Consolidation\OutputFormatters\StructuredData\RowsOfFields;
use Drupal\open_pension_fetcher\OpenPensionFetcherQuery;
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

  public function __construct(OpenPensionFetcherQuery $fetcher_query) {
    $this->fetchQueryService = $fetcher_query;
  }

  /**
   * Command description here.
   *
   * @command open_pension_fetcher:get_links_files
   */
  public function commandName() {
    print_r($this->fetchQueryService->collectLinks());
  }
}
