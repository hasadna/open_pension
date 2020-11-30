<?php

namespace Drupal\Tests\open_pension_files\Kernel;

use Drupal\Core\Logger\LoggerChannel;

/**
 * Logger channel for tests.
 */
class OpenPensionFilesLoggerChannel extends LoggerChannel {

  /**
   * List of logs.
   *
   * @var string[]
   */
  public $logs;

  /**
   * {@inheritdoc}
   */
  public function log($level, $message, array $context = []) {
    $this->logs[] = [
      'level' => $level,
      'message' => $message,
    ];
  }

}
