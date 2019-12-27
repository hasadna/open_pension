<?php

namespace Drupal\Tests\open_pension_blog\Kernel;

use Drupal\KernelTests\KernelTestBase;
use Drupal\node\Entity\Node;
use Drupal\node\Entity\NodeType;
use Drupal\Tests\graphql\Traits\HttpRequestTrait;
use Drupal\Tests\node\Traits\ContentTypeCreationTrait;
use Drupal\user\Entity\Role;

/**
 * Testing the graphql endpoint for guests.
 */
class GraphQlBlogEndpointTest extends KernelTestBase {

  use HttpRequestTrait;

  use ContentTypeCreationTrait {
    createContentType as drupalCreateContentType;
  }

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = [
    'user',
    'system',
    'field',
    'node',
    'text',
    'filter',
    'open_pension_blog',
    'graphql',
    'graphql_core',
  ];

  /**
   * List of nodes.
   *
   * @var \Drupal\node\Entity\Node[]
   */
  public $nodes;

  /**
   * The http client.
   *
   * @var \GuzzleHttp\Client
   */
  protected $httpClient;

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();

    // Necessary for module uninstall.
    $this->installEntitySchema('user');
    $this->installEntitySchema('node');
    $this->installConfig(['node']);

    NodeType::create(['name' => 'Blog', 'type' => 'blog']);

    // Create list of blogs.
    $templates = [
      [
        'type' => 'blog',
        'title' => 'First blog',
      ],
      [
        'type' => 'blog',
        'title' => 'Second blog',
      ],
    ];

    foreach ($templates as $template) {
      $node = Node::create($template);
      $node->save();
      $this->nodes[] = $node;
    }

    $this->httpClient = $this->container->get('http_client');

    // Grant access to anonymous users.
    Role::create(['id' => Role::ANONYMOUS_ID, 'label' => 'anonymous user'])
      ->grantPermission('execute graphql requests')
      ->grantPermission('access content')
      ->save();
  }

  /**
   * Testing graphql for getting all the blogs in the system.
   */
  public function testListOfBlogs() {
    $query = <<<GQL
     query {
      nodeQuery {
        count
        entities {
          entityId
				  entityLabel
        }
      }
    } 
GQL;

    // Query the graphql as an anonymous user.
    $output = json_decode($this->query($query)->getContent(), TRUE);
    $query_results = $output['data']['nodeQuery'];

    // Check the count is correct.
    $this->assertEquals($query_results, [
      'count' => 2,
      'entities' => [
        [
          'entityId' => $this->nodes[0]->id(),
          'entityLabel' => $this->nodes[0]->label(),
        ],
        [
          'entityId' => $this->nodes[1]->id(),
          'entityLabel' => $this->nodes[1]->label(),
        ],
      ],
    ]);
  }

}
