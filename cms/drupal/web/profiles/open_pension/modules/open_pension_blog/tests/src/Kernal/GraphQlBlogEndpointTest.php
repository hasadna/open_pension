<?php

namespace Drupal\Tests\open_pension_blog\Kernel;

use Drupal\KernelTests\KernelTestBase;

class GraphQlBlogEndpointTest extends KernelTestBase {

  /**
   * {@inheritdoc}
   */
  public static $modules = ['open_pension_blog'];

  /**
   * {@inheritdoc}
   */
  public function setUp() {
    parent::setUp();
  }

  /**
   * Testing graphql for getting all the blogs in the system.
   */
  function testListOfBlogs() {
    // Create a couple of blogs.

    // Query the graphql as an anonymous user.
  }

  /**
   * Testing when asking for a single blog entry.
   */
  function testSingleBlogRetrive() {
    // Create a blog.

    //  Query as an anonymous user.
  }

}
