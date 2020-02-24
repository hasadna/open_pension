<?php

namespace Drupal\open_pension_logs\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use GuzzleHttp\ClientInterface;

/**
 * Class OpenPensionLogsController.
 */
class OpenPensionLogsController extends ControllerBase {

  /**
   * GuzzleHttp\ClientInterface definition.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * Constructs a new OpenPensionLogsController object.
   */
  public function __construct(ClientInterface $http_client) {
    $this->httpClient = $http_client;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
          $container->get('http_client')
      );
  }

  /**
   * View logs from other services.
   *
   * @return array
   *   Return renderable markup.
   */
  public function viewLogs() {
    $module_path = drupal_get_path('module', 'open_pension_logs');
    $contents = file_get_contents($module_path . '/templates/log-vue-template.html');

    return [
      '#type' => 'markup',
      '#markup' => $contents,
      '#attached' => [
        'library' => ['open_pension_logs/logs.viewer'],
      ],
    ];
  }

}
