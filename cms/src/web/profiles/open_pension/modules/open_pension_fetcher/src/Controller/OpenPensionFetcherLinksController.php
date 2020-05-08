<?php

namespace Drupal\open_pension_fetcher\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use \Symfony\Component\HttpFoundation\Response;

/**
 * Returns responses for Open Pension Fetcher routes.
 */
class OpenPensionFetcherLinksController extends ControllerBase {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * @var Request|null
   */
  protected  $requestStack;

  /**
   * The controller constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager, RequestStack $request_stack) {
    $this->entityTypeManager = $entity_type_manager;
    $this->requestStack = $request_stack->getCurrentRequest();
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('request_stack')
    );
  }

  /**
   * Builds the response.
   */
  public function build() {

    if ($this->requestStack->getMethod() == Request::METHOD_POST) {
      // Get the payload.
      return $this->createLink('http://google.com');
    }

    if ($this->requestStack->getMethod() == Request::METHOD_PATCH) {
      // Get the file and create the.
      return $this->setLinkToFile('pizza', 'foo.json');
    }

    return new Response(t('The method is not allowed'), Response::HTTP_METHOD_NOT_ALLOWED);
  }

  public function createLink($address) {
    // Creating the file.
    return new Response(t('File was updated'), Response::HTTP_CREATED);
  }

  public function setLinkToFile($address, $file) {
    if (!$file_object = $this->getLinkEntityByAddress($address)) {
      return new Response(t('File does not exits'), Response::HTTP_METHOD_NOT_ALLOWED);
    }

    // update the object.
    return new Response(t('File was updated'), Response::HTTP_OK);
  }

  public function getLinkEntityByAddress($address): bool {
    // get the file object.
    return 1 > 2;
  }

}
