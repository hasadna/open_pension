<?php

namespace Drupal\Tests\open_pension_blog\Kernel;

use Drupal\KernelTests\KernelTestBase;
use Drupal\node\Entity\Node;
use Drupal\Tests\graphql\Traits\HttpRequestTrait;
use Drupal\Tests\node\Traits\ContentTypeCreationTrait;
use Drupal\user\Entity\Role;

class GraphQlBlogEndpointTest extends KernelTestBase {

  use HttpRequestTrait;

  use ContentTypeCreationTrait {
    createContentType as drupalCreateContentType;
  }

  /**
   * {@inheritdoc}
   */
  public static $modules = ['open_pension_blog', 'node', 'user', 'graphql', 'graphql_core'];

  public $nodes;

  /**
   * @var \GuzzleHttp\Client
   */
  protected $httpClient;

  /**
   * {@inheritdoc}
   */
  public function setUp() {
    parent::setUp();

    // Create the needed entity types.
    $this->installEntitySchema('node');
    $this->installEntitySchema('user');

    $this->createContentType(['type' => 'blog']);


    // Create list of blogs
    $templates = [
      [
        'type' => 'blog',
        'title' => 'First blog',
      ],
      [
        'type' => 'blog',
        'title' => 'Second blog',
      ]
    ];

    foreach ($templates as $template) {
      $node = Node::create($template);
      $node->save();
      $this->nodes[] = $node;
    }

    $this->httpClient = $this->container->get('http_client');

    print_r(Role::loadMultiple());

    // Grant access to anonymous users.
    $role = Role::create(['id' => Role::ANONYMOUS_ID, 'label' => 'anonymous user'])
      ->grantPermission('execute graphql requests');

    $role->save();

    //execute graphql requests

  }

  /**
   * Testing graphql for getting all the blogs in the system.
   */
  function testListOfBlogs() {
    $query = " {
      nodeQuery {
        count
        entities {
          entityLabel
            ... on NodeArticle {
            body {
              value
            }
          }
        }
      }
    }";

    // Query the graphql as an anonymous user.
    $foo = $this->query($query);
    var_dump($foo);
  }

  /**
   * Testing when asking for a single blog entry.
   */
  function _testSingleBlogRetrieve() {
    // Create a blog.

    //  Query as an anonymous user.
  }

}
