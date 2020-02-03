<?php

namespace Drupal\Tests\open_pension_files\Kernel;

use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use Drupal\Tests\BrowserTestBase;

/**
 * Testing the view fo the files.
 */
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
   * @var \Drupal\user\Entity\User
   */
  protected $account;

  /**
   * Client service.
   *
   * @var \GuzzleHttp\Client
   */
  protected $client;

  /**
   * Filesystem service.
   *
   * @var \Drupal\Core\File\FileSystem
   */
  protected $fileSystem;

  /**
   * Media objects.
   *
   * @var \Drupal\media\Entity\Media[]
   */
  protected $mediaObjects;

  /**
   * Metadata of the testing files.
   *
   * @var array
   */
  protected $files = [
    'dummy-xsl-file.xlsx' => [
      'media_object_key' => 0,
      'after_process_text' => 'Yes',
      'logs' => [
        'The file dummy-xsl-file.xlsx has been processed',
        'Starting to process the file dummy-xsl-file.xlsx',
      ],
    ],
    'dummy-xsl-file-2.xlsx' => [
      'media_object_key' => 1,
      'after_process_text' => 'No',
      'logs' => [
        "The file dummy-xsl-file-2.xlsx was not able to process",
        "Starting to process the file dummy-xsl-file-2.xlsx",
      ],
    ],
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

    // Creating the services.
    $this->createFiles();
  }

  /**
   * Create dummy files for the view.
   */
  protected function createFiles() {
    $base_xsl_files = drupal_get_path('module', 'open_pension_files') . '/tests/src/Functional';

    foreach (array_keys($this->files) as $file) {
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
        'field_media_file' => $file_object->id(),
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

    // Check we have two files and make sure they have not been processed yet.
    foreach ($this->files as $file_name => $file_metadata) {
      $this->assertText($file_name);

      $media_object = $this->mediaObjects[$file_metadata['media_object_key']];

      // Check the first file was not processed yet.
      $xpath = "//tr[@class='media-{$media_object->id()}']//td[contains(@class, 'processed') and contains(., 'No')]";

      if (!$this->getSession()->getPage()->find("xpath", $xpath)) {
        $this->fail("The file {$media_object->getName()} is processed before the related operation triggered.");
      }
    }
  }

  /**
   * Testing that a uer can upload a file.
   */
  public function testViewFiles() {
    $this->commonFlow();

    $this
      ->sendSingleFileToProcess('dummy-xsl-file.xlsx')
      ->checkProcessResults('dummy-xsl-file.xlsx');

    $this
      ->sendSingleFileToProcess('dummy-xsl-file-2.xlsx')
      ->checkProcessResults('dummy-xsl-file-2.xlsx');
  }

  /**
   * Helper function to send file for processing and validations.
   *
   * @param mixed $file_name
   *   The matching file name from the file lists.
   *
   * @return ManageUploadedFilesViewTest
   *   The current instance.
   */
  final protected function sendSingleFileToProcess($file_name) {
    $media_object = $this->mediaObjects[$this->files[$file_name]['media_object_key']];

    // Send the first file to process.
    $xpath = "//tr[@class='media-{$media_object->id()}']//a[.='Send to process']";
    $this->getSession()->getPage()->find("xpath", $xpath)->click();
    return $this;
  }

  /**
   * Checking the process results.
   *
   * @param mixed $file_name
   *   The matching file name from the file lists.
   */
  protected function checkProcessResults($file_name) {
    $file_metadata = $this->files[$file_name];

    $media_object = $this->mediaObjects[$file_metadata['media_object_key']];
    $after_process_text = $file_metadata['after_process_text'];
    $process_logs = $file_metadata['logs'];

    // Check the file has been processed.
    $xpath = "//tr[@class='media-{$media_object->id()}']//td[contains(@class, 'processed') and contains(., '{$file_metadata['after_process_text']}')]";

    if (!$this->getSession()->getPage()->find("xpath", $xpath)) {
      $this->fail("The processed status for {$media_object->getName()} need to be {$after_process_text} but it's not");
    }

    // Checking the process logs texts.
    foreach ($process_logs as $process_log) {
      $xpath = "//tr[@class='media-{$media_object->id()}']" .
        "//td[contains(@class, 'views-field-field-history') and contains(., '{$process_log}')]";

      if (!$this->getSession()->getPage()->find("xpath", $xpath)) {
        $this->fail("The processed log, {$process_log}, for {$media_object->getName()} does not exists");
      }
    }
  }

  /**
   * Testing the action for sending the files to process on the files.
   */
  public function testActionForMultipleFiles() {
    // Start with the normal stuff.
    $this->commonFlow();

    // Checking the check boxes.
    $this->getSession()->getPage()->find('xpath', "//input[@name='media_bulk_form[0]']")->check();
    $this->getSession()->getPage()->find('xpath', "//input[@name='media_bulk_form[1]']")->check();

    // Selecting the "send files for processing" option from the list.
    $this
      ->getSession()
      ->getPage()
      ->find('xpath', "//select[@name='action']")
      ->selectOption('Send files to the process service');

    // Clicking on the submit button.
    $this->getSession()->getPage()->find('xpath', '//input[@id="edit-submit"]')->click();

    // Make sure the message exists.
    $this->assertText('Send files to the process service was applied to 2 items');

    // Make sure we get the same results as the previous test.
    $this->checkProcessResults('dummy-xsl-file.xlsx');
    $this->checkProcessResults('dummy-xsl-file-2.xlsx');
  }

}
