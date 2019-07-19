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
    'devel',
    'kint'
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
  }

  /**
   * Testing that a uer can upload a file.
   */
  public function testViewFiles() {
    $this->commonFlow();
    $this->firstFileFlowTests();
    $this->secondFileFlowTests();
  }

  /**
   * Helper function to contain all the logic for the first file.
   */
  final protected function firstFileFlowTests() {
    // Check the fist file was not processed yet.
    $xpath = "//tr[@class='media-{$this->mediaObjects[0]->id()}']//td[contains(@class, 'processed') and contains(., 'No')]";

    if (!$this->getSession()->getPage()->find("xpath", $xpath)) {
      $this->fail('The file has been processed before the process ever committed');
    }

    // Send the first file to process.
    $xpath = "//tr[@class='media-{$this->mediaObjects[0]->id()}']//a[.='Send to process']";
    $this->getSession()->getPage()->find("xpath", $xpath)->click();

    // Check the file has been processed.
    $xpath = "//tr[@class='media-{$this->mediaObjects[0]->id()}']//td[contains(@class, 'processed') and contains(., 'Yes')]";
    if (!$this->getSession()->getPage()->find("xpath", $xpath)) {
      $this->fail('it seems the the file has been processed.');
    }
  }

  /**
   * The function holds logic of the second file flow.
   */
  final protected function secondFileFlowTests() {
    // Make sure the second file was not processed yet.
    $xpath = "//tr[@class='media-{$this->mediaObjects[1]->id()}']//td[contains(@class, 'processed') and contains(., 'No')]";

    if (!$this->getSession()->getPage()->find("xpath", $xpath)) {
      $this->fail('The file has been processed before the process ever committed');
    }

    // Now, process the second file.
    $xpath = "//tr[@class='media-{$this->mediaObjects[1]->id()}']//a[.='Send to process']";
    $this->getSession()->getPage()->find("xpath", $xpath)->click();

    $xpath = "//tr[@class='media-{$this->mediaObjects[1]->id()}']//td[contains(@class, 'processed') and contains(., 'No')]";
    if (!$this->getSession()->getPage()->find("xpath", $xpath)) {
      $this->fail('It seems the file has been processed while it was not suppose to.');
    }
  }

}
