<?php

namespace Drupal\Tests\open_pension_files\Kernel;

use Drupal\Tests\BrowserTestBase;
use Drupal\user\Entity\User;

class UploadFileFormTest extends BrowserTestBase {

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = [
    'user',
    'system',
    'open_pension_files',
    'views',
    'features'
  ];

  public $profile = 'open_pension';

  /**
   * @var User
   */
  protected $account;

  /**
   * @var \Drupal\Core\File\FileSystem
   */
  protected $fileSystem;

  /**
   * {@inheritdoc}
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  protected function setUp() {
    parent::setUp();

    $this->account = $this->drupalCreateUser(['upload files', 'manage file']);
    $this->fileSystem = $this->container->get('file_system');
  }

  /**
   * Testing that a uer can upload a file.
   */
  public function testUploadFileForm() {
    $base_xsl_files = drupal_get_path('module', 'open_pension_files') . '/tests/src/Functional';
    $this->drupalLogin($this->account);

    $edit = [
      'Select files to upload' => $this->fileSystem->realpath($base_xsl_files . '/dummy-xsl-file.xlsx'),
    ];

    $this->drupalPostForm('admin/open_pension/upload_files', $edit, t('Submit'));

    // Making sure texts exists.
    $this->assertText('1 has been uploaded.');
    $this->assertText('dummy-xsl-file.xlsx');

    // Check the actions available.
    $this->assertOptionByText("edit-action", t('Send files to the process service'));
  }

}
