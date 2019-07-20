<?php

namespace Drupal\Tests\open_pension_files\Kernel;

use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use Drupal\open_pension_files\OpenPensionFilesProcessInterface;
use Drupal\Tests\BrowserTestBase;
use Drupal\user\Entity\User;

class ManageUploadedFilesViewTest extends BrowserTestBase {

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = [
    'user',
    'system',
    'open_pension_files',
    'open_pension_files_test',
    'views',
    'features',
  ];

  /**
   * The name of the installation profile.
   *
   * @var string
   */
  public $profile = 'open_pension';

  /**
   * The account object.
   *
   * @var User
   */
  protected $account;

  /**
   * @var \GuzzleHttp\Client
   */
  protected $client;

  /**
   * @var \Drupal\Core\File\FileSystem
   */
  protected $fileSystem;

  /**
   * @var OpenPensionFilesProcessInterface
   */
  protected $openPensionFilesProcess;

  /**
   * @var Media[]
   */
  protected $mediaObjects;

  /**
   * @var array
   */
  protected $files = [
    'dummy-xsl-file.xlsx',
    'dummy-xsl-file-2.xlsx'
  ];

  /**
   * {@inheritdoc}
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  protected function setUp() {
    parent::setUp();

    // Setting up permissions and services.
    $this->account = $this->drupalCreateUser(['upload files', 'manage file']);
    $this->fileSystem = $this->container->get('file_system');
    $this->openPensionFilesProcess = $this->container->get('open_pension_files.file_process');

    // Creating the services.
    $this->createFiles();
  }

  /**
   * Create dummy files for the view.
   */
  protected function createFiles() {
    $base_xsl_files = drupal_get_path('module', 'open_pension_files') . '/tests/src/Functional';

    foreach ($this->files as $file) {
      // Create the file object.
      $file_path = $this->fileSystem->realpath($base_xsl_files . '/' . $file);

      // Create the media object.
      $file_object = File::create([
        'uri' => $this->fileSystem->copy($file_path, 'public://open_pension_files'),
        'filename' => $file,
        'status' => FILE_STATUS_PERMANENT,
      ]);

      $file_object->save();

      // Creating a matching media entity.
      $media = Media::create([
        'bundle' => 'open_pension_file',
        'field_media_file' => $file_object->id()
      ]);
      $media->save();

      $this->mediaObjects[] = $media;
    }
  }

  /**
   * Function that checks a common stuff.
   */
  final protected function commonFlow() {
    // Login to the system.
    $this->drupalLogin($this->account);

    // Check the files exists.
    $this->drupalGet('admin/open_pension/uploaded_files');

    // Check we have two files.
    $this->assertText($this->files[0]);
    $this->assertText($this->files[1]);

    // Check the first file was not processed yet.
    $xpath = "//tr[@class='media-{$this->mediaObjects[0]->id()}']//td[contains(@class, 'processed') and contains(., 'No')]";

    if (!$this->getSession()->getPage()->find("xpath", $xpath)) {
      $this->fail("The file {$this->mediaObjects[0]->getName()} is processed before the related operation triggered.");
    }

    // Check the second file was not processed yet.
    $xpath = "//tr[@class='media-{$this->mediaObjects[1]->id()}']//td[contains(@class, 'processed') and contains(., 'No')]";

    if (!$this->getSession()->getPage()->find("xpath", $xpath)) {
      $this->fail("The file {$this->mediaObjects[1]->getName()} is processed before the related operation triggered.");
    }
  }

  /**
   * Testing that a uer can upload a file.
   */
  public function testViewFiles() {
    $this->commonFlow();
    $this->sendSingleFileToProcess(0, 'Yes');
    $this->sendSingleFileToProcess(1, 'No');
  }

  /**
   * Helper function to send file for processing and validations.
   *
   * @param $file_delta
   *   The delta of the file from the media objects.
   * @param $after_process_text
   *   The text in the process field need to show.
   */
  final protected function sendSingleFileToProcess($file_delta, $after_process_text) {
    $media_object = $this->mediaObjects[$file_delta];

    // Send the first file to process.
    $xpath = "//tr[@class='media-{$media_object->id()}']//a[.='Send to process']";
    $this->getSession()->getPage()->find("xpath", $xpath)->click();

    // Check the file has been processed.
    $xpath = "//tr[@class='media-{$media_object->id()}']//td[contains(@class, 'processed') and contains(., '{$after_process_text}')]";
    if (!$this->getSession()->getPage()->find("xpath", $xpath)) {
      $this->fail("The processed status for {$media_object->getName()} need to be {$after_process_text} but it's not");
    }
  }

}
