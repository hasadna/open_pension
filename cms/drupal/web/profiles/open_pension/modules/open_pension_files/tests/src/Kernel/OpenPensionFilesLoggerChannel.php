<?php

namespace Drupal\Tests\open_pension_files\Kernel;


class OpenPensionFilesLoggerChannel extends \Drupal\Core\Logger\LoggerChannel {

  /**
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
