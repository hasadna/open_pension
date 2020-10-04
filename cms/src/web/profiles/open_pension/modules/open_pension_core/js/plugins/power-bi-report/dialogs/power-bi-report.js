/**
 * @file
 * Defines dialog for Power BI Report CKEditor plugin.
 */

(function (Drupal) {

  'use strict';

  // Dialog definition.
  CKEDITOR.dialog.add('powerBiReportDialog', function (editor) {

    return {

      // Basic properties of the dialog window: title, minimum size.
      title: Drupal.t('Sheet properties'),
      minWidth: 400,
      minHeight: 150,

      // Dialog window content definition.
      contents: [
        {
          // Definition of the settings dialog tab.
          id: 'tab-settings',
          label: 'Settings',

          // The tab content.
          elements: [
            {
              // Text input field for the abbreviation text.
              type: 'text',
              id: 'address',
              label: Drupal.t('Report address'),

              // Validation checking whether the field is not empty.
              validate: CKEDITOR.dialog.validate.notEmpty(Drupal.t('Please insert the report address.'))
            },
          ]
        }
      ],

      // This method is invoked once a user clicks the OK button, confirming the
      // dialog.
      onOk: function () {

        // The context of this function is the dialog object itself.
        // See http://docs.ckeditor.com/#!/api/CKEDITOR.dialog.
        var dialog = this;

        // Create a new <iframe> element.
        var abbr = editor.document.createElement('iframe');

        // Set element attribute and text by getting the defined field values.
        abbr.setAttribute('width', '100%');
        abbr.setAttribute('height', '1000');
        abbr.setAttribute('frameborder', '1000');
        abbr.setAttribute('allowfullscreen', '');
        abbr.setAttribute('src', dialog.getValueOf('tab-settings', 'address'));

        // Finally, insert the element into the editor at the caret position.
        editor.insertElement(abbr);
      }
    };

  });

} (Drupal));
