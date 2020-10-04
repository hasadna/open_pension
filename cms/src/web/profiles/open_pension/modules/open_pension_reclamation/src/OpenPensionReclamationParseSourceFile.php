<?php

namespace Drupal\open_pension_reclamation;


/**
 * OpenPensionReclamationParseSourceFile service.
 */
class OpenPensionReclamationParseSourceFile {

  /**
   * Get the data from a given sheet in the file of the reclamation tables.
   */
  public function getSheetRows($worksheet, $headers = [], callable $iteration_process = null) {
    $xls = \SimpleXLSX::parse(drupal_get_path('module', 'open_pension_reclamation') . '/DIM_PensionFund.xlsx');
    $sheet_index = array_search($worksheet, $xls->sheetNames());
    $rows = $xls->rows($sheet_index);

    foreach ($rows as $key => &$row) {

      if ($key == 0) {
        if (!$headers) {
          $headers = array_map('trim', $row);
        }
        continue;
      }

      $row = array_combine($headers, $row);

      if ($iteration_process) {
        $iteration_process($row);
      }
    }

    return $iteration_process ? [] : $rows;
  }

}
