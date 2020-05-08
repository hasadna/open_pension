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

  public function getOrCreateFile(string $file_uri) {
    $file_ids = $this->entityTypeManager->getStorage('file')->getQuery()->condition('uri', $file_uri)->execute();

    if ($file_ids) {
      return reset($file_ids);
    }

    $file = $this->entityTypeManager->getStorage('file')->create(['uri' => $file_uri]);
    $file->save();

    return $file->id();
  }

  public function getOrCreateMediaLink($file_id): \Drupal\Core\Entity\EntityInterface {
    $media_ids = $this->entityTypeManager->getStorage('media')->getQuery()
      ->condition('field_media_file', $file_id)
      ->condition('bundle', 'open_pension_file')
      ->execute();

    if ($media_ids) {
      return reset($media_ids);
    }

    $media = $this->entityTypeManager->getStorage('media')
      ->create([
        'bundle' => 'open_pension_file',
        'field_media_file' => $file_id
      ]);
    $media->save();
    return $media;
  }

  /**
   * Builds the response.
   */
  public function build() {
    // Get the payload.
    $response = json_decode($this->requestStack->getContent(), TRUE);

    if ($constraints = $this->validatePayload($this->requestStack->getMethod(), $response)) {
      return $constraints;
    }

    if ($this->requestStack->getMethod() == Request::METHOD_POST) {
      return $this->createLink($response['link']);
    }

    // Create the file in the system.
    return $this->setLinkToFile($response['link'], $response['file'], "{$response['name']}.XLSX");
  }

  public function validatePayload($method, $payload) {
    return null;
  }

  public function createLink($address) {
    $exists = $this->entityTypeManager->getStorage('open_pension_links')->getQuery()
      ->condition('url', $address)
      ->execute();

    if ($exists) {
      return new Response(t('The file is already exists'), Response::HTTP_OK);
    }

    $created = $this->entityTypeManager->getStorage('open_pension_links')
      ->create(['url' => $address])
      ->save();

    if ($created) {
      return new Response(t('File was updated'), Response::HTTP_CREATED);
    }

    return new Response(t('An error during creation'), Response::HTTP_BAD_REQUEST);
  }

  public function setLinkToFile($address, $file, $file_name) {
    if (!$link_ids = $this->getLinkEntityByAddress($address)) {
      return new Response(t('File does not exits'), Response::HTTP_METHOD_NOT_ALLOWED);
    }

    $link = $this->entityTypeManager->getStorage('open_pension_links')->load(reset($link_ids));

//    if ($link->get('open_pension_file')->value) {
//      return new Response(t('The link already has a file. Skipping'), Response::HTTP_METHOD_NOT_ALLOWED);
//    }

    $file_uri = 'public://' . $file_name;

    if (!file_put_contents($file_uri, base64_decode($file))) {
      return new Response(t('File was un able to save'), Response::HTTP_BAD_REQUEST);
    }

    $file_id = $this->getOrCreateFile($file_uri);
    $media = $this->getOrCreateMediaLink($file_id);

    // Update the reference.
    $link->set('open_pension_file', $media);
    $link->save();

    // update the object.
    return new Response(t('File was updated'), Response::HTTP_OK);
  }

  public function getLinkEntityByAddress($address) {
    return $this->entityTypeManager->getStorage('open_pension_links')
      ->getQuery()
      ->condition('url', $address)
      ->execute();
  }

}
