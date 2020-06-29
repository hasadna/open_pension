<?php

namespace Drupal\open_pension_fetcher\Controller;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Session\AccountInterface;
use Psr\Log\LoggerInterface;
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
  protected $requestStack;

  /**
   * @var LoggerInterface
   */
  protected $logger;

  /**
   * The controller constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager, RequestStack $request_stack, LoggerInterface $logger) {
    $this->entityTypeManager = $entity_type_manager;
    $this->requestStack = $request_stack->getCurrentRequest();
    $this->logger = $logger;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('request_stack'),
      $container->get('logger.factory')->get('open_pension_fetcher')
    );
  }

  /**
   * Custom access method. This method will allow anyone to access for now but
   * in the future will check that only request from inside the container will
   * have access to this endpoint.
   *
   * @param AccountInterface $account
   *  The account object.
   *
   * @return AccessResult|\Drupal\Core\Access\AccessResultAllowed|\Drupal\Core\Access\AccessResultNeutral
   */
  public function access(AccountInterface $account) {
    // For now, allow every one to access.
    return AccessResult::allowedIf(TRUE);
  }

  /**
   * Getting or creating a file object for a given file URI.
   *
   * @param string $file_uri
   *  The file URI.
   *
   * @return int
   *  The file ID.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function getOrCreateFile(string $file_uri) {
    $file_ids = $this->entityTypeManager->getStorage('file')->getQuery()->condition('uri', $file_uri)->execute();

    if ($file_ids) {
      $this->logger->info(t('Found a file for @uri', ['@uri' => $file_uri]));
      return reset($file_ids);
    }

    $file = $this->entityTypeManager->getStorage('file')->create(['uri' => $file_uri]);
    $file->save();

    $this->logger->info(t('A new file entry, @id, was created for the uri @uri', ['@uri' => $file_uri, '@id' => $file->id()]));
    return $file->id();
  }

  /**
   * Getting or creating an open pension file media bundle instances.
   *
   * @param $file_id
   *  The file ID.
   *
   * @return int
   *  The media id.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function getOrCreateMediaLink($file_id) {
    $media_ids = $this->entityTypeManager->getStorage('media')->getQuery()
      ->condition('field_media_file', $file_id)
      ->condition('bundle', 'open_pension_file')
      ->execute();

    if ($media_ids) {
      $this->logger->info(t('Found a media for the file id @file-id', ['@file-id' => $file_id]));
      return reset($media_ids);
    }

    $media = $this->entityTypeManager->getStorage('media')
      ->create([
        'bundle' => 'open_pension_file',
        'field_media_file' => $file_id
      ]);

    $media->save();

    $this->logger->info(t('A media entry, @media-id, was create for the file @file-id', ['@file-id' => $file_id, '@media-id' => $media->id()]));
    return $media->id();
  }

  /**
   * Validating the payload.
   *
   * @param $method
   *  The method of the request - post or patch.
   * @param $payload
   *  The payload.
   *
   * @return null|string[]
   *  Null in case the payload is or a list of strings.
   */
  public function validatePayload($method, $payload) {
    return null;
  }

  /**
   * Get or create an open pension link object.
   *
   * @param $address
   *  The address of the link.
   *
   * @return Response
   *  The response object.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function getOrCreateLink($address) {
    $exists = $this->entityTypeManager->getStorage('open_pension_links')->getQuery()
      ->condition('url', $address)
      ->execute();

    if ($exists) {
      // We have a link entry which relate to this file address.
      $this->logger->info(t('There is already a link record for the url @url', ['@url' => $address]));
      return new Response(t('The file is already exists'), Response::HTTP_OK);
    }

    // No record in the DB for this file. Try to create on.
    $created = $this->entityTypeManager->getStorage('open_pension_links')
      ->create(['url' => $address])
      ->save();

    if ($created) {
      // Manage to create it.
      $this->logger->info(t('A link record was created for the address @url', ['@url' => $address]));
      return new Response(t('File was updated'), Response::HTTP_CREATED);
    }

    $this->logger->error(t('Something went wrong when trying to create a record for the URL @url', ['@url' => $address]));
    return new Response(t('An error during creation'), Response::HTTP_BAD_REQUEST);
  }

  /**
   * Creating a file wich the fetcher downloaded and save it in the DB.
   *
   * @param $address
   *  The link address.
   * @param $file
   *  A base64 representation of the file.
   * @param $file_name
   *  The file name.
   *
   * @return Response
   *  Response which indicate about the process.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function updateLinkRecordWithAFile($address, $file, $file_name) {
    if (!$link_ids = $this->getLinkEntityByAddress($address)) {
      $this->logger->error(t('A link record was not exists for the url @url', ['@url' => $address]));
      return new Response(t('File does not exits'), Response::HTTP_METHOD_NOT_ALLOWED);
    }

    // Get the link object which match the given address.
    $link = $this
      ->entityTypeManager
      ->getStorage('open_pension_links')
      ->load(reset($link_ids));

    // Creating the URI.
    // todo: set the stream wrapper in the DB so we could switch it to the
    // any storage we desire.
    $file_uri = 'public://' . $file_name;

    if (!file_put_contents($file_uri, base64_decode($file))) {
      // Could not create the file.
      $this->logger->error(t('Was not able to create a file for the url @url and file name @file-name', ['@url' => $address, '@file-name' => $file]));
      return new Response(t('File was un able to save'), Response::HTTP_BAD_REQUEST);
    }

    // Getting the media and the file ID.
    $file_id = $this->getOrCreateFile($file_uri);
    $media_id = $this->getOrCreateMediaLink($file_id);

    // Update the reference.
    $link->set('open_pension_file', $media_id);
    $link->save();

    // update the object.
    $this->logger->info(t('The link record was updated with the file id @file-id', ['@url' => $address, '@file-id' => $file_id]));
    return new Response(t('File was updated'), Response::HTTP_OK);
  }

  /**
   * Query the DB for a record which match the given address.
   *
   * @param $address
   *  The address.
   * @return array
   *  List if IDs.
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getLinkEntityByAddress($address) {
    return $this->entityTypeManager->getStorage('open_pension_links')
      ->getQuery()
      ->condition('url', $address)
      ->execute();
  }

  /**
   * Builds the response.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function build() {
    // Get the payload.
    $response = json_decode($this->requestStack->getContent(), TRUE);

    // Verifying there's no error with the payload.
    if ($constraints = $this->validatePayload($this->requestStack->getMethod(), $response)) {
      return $constraints;
    }

    if ($this->requestStack->getMethod() == Request::METHOD_POST) {
      // This is post method. Create an object in the DB and return it.
      return $this->getOrCreateLink($response['link']);
    }

    // Create the file in the system.
    return $this->updateLinkRecordWithAFile(
      $response['link'], $response['file'], "{$response['name']}.XLSX"
    );
  }

}
