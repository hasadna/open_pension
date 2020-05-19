<?php

namespace Drupal\open_pension_files\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\example\ExampleInterface;
use Drupal\open_pension_services\OpenPensionServicesAddresses;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Returns responses for Open Pension Files routes.
 */
class OpenPensionFilesController extends ControllerBase {

  /**
   * @var OpenPensionServicesAddresses
   */
  protected $servicesAddresses;

  /**
   * OpenPensionFilesController constructor.
   *
   * @param OpenPensionServicesAddresses $services_addresses
   */
  public function __construct(OpenPensionServicesAddresses $services_addresses) {
    $this->servicesAddresses = $services_addresses;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('open_pension_services.services_addresses')
    );
  }

  /**
   * Builds the response.
   */
  public function getProcessedFile(\Drupal\media\Entity\Media $media) {

    $processor_address = $this->servicesAddresses->getProcessorAddress();
    $processor_id = $media->get('field_reference_in_other_service')->value;

    $content = file_get_contents("{$processor_address}/results/{$processor_id}");
    return new JsonResponse(json_decode($content)->results, 200, ['Content-Type'=> 'application/json']);
  }

}
