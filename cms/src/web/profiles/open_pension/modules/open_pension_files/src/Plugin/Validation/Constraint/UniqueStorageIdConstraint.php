<?php

namespace Drupal\open_pension_files\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * Provides an UniqueStorageId constraint.
 *
 * @Constraint(
 *   id = "OpenPensionFilesUniqueStorageId",
 *   label = @Translation("UniqueStorageId", context = "Validation"),
 * )
 *
 * @DCG
 * To apply this constraint on third party field types. Implement
 * hook_field_info_alter().
 */
class UniqueStorageIdConstraint extends Constraint {

  public $errorMessage = 'The storage ID is not unique.';

}
