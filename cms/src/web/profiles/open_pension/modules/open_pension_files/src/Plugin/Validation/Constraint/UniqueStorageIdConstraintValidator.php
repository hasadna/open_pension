<?php

namespace Drupal\open_pension_files\Plugin\Validation\Constraint;

use Drupal\open_pension_files\OpenPensionFiles;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Validates the UniqueStorageId constraint.
 */
class UniqueStorageIdConstraintValidator extends ConstraintValidator {

  /**
   * {@inheritdoc}
   */
  public function validate($item, Constraint $constraint) {
    $value = $item->getValue()[0]['value'];

    $exclude_id = !$item->getEntity()->isNew() ? $item->getEntity()->id() : NULL;

    if (OpenPensionFiles::getFilesIDByStorageId($value, $exclude_id)) {
      $this->context->addViolation($constraint->errorMessage);
    }
  }

}
