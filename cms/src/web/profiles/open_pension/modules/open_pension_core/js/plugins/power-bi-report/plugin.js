/**
 * @file
 * Power BI Report CKEditor plugin.
 *
 * Basic plugin inserting abbreviation elements into the CKEditor editing area.
 *
 * @DCG The code is based on an example from CKEditor Plugin SDK tutorial.
 *
 * @see http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

(function (Drupal) {

  'use strict';

  CKEDITOR.plugins.add('open_pension_core_power_bi_report', {

    // Register the icons.
    icons: 'power-bi-report',

    // The plugin initialization logic goes inside this method.
    init: function (editor) {

      // Define an editor command that opens our dialog window.
      editor.addCommand('powerBiReport', new CKEDITOR.dialogCommand('powerBiReportDialog'));

      // Create a toolbar button that executes the above command.
      editor.ui.addButton('power-bi-report', {

        // The text part of the button (if available) and the tooltip.
        label: Drupal.t('Insert sheet'),

        // The command to execute on click.
        command: 'powerBiReport',

        // The button placement in the toolbar (toolbar group name).
        toolbar: 'insert'
      });

      // Register our dialog file, this.path is the plugin folder path.
      CKEDITOR.dialog.add('powerBiReportDialog', this.path + 'dialogs/power-bi-report.js');
    }
  });

} (Drupal));
