(function ($) {

    // Protect IE8 from any erroneous console.log uses which would break everything
    if (!window.console) {
        console = { log: function() {} }
    };

    var $html = $('html'),
        lt10 = $html.hasClass('lt-ie10');

    $html.removeClass('no-js');

    pulsar.button = new pulsar.ButtonComponent($html);
    pulsar.disableUi = new pulsar.DisableUiComponent($html);
    pulsar.flash = new pulsar.FlashMessageComponent($html);
    pulsar.helpText = new pulsar.HelpTextComponent($html, window, document);
    pulsar.pulsarForm = new pulsar.PulsarFormComponent($html);
    pulsar.pulsarUI = new pulsar.PulsarUIComponent($html, window.History);
    pulsar.pulsarSortable = new pulsar.PulsarSortableComponent($html, window);
    pulsar.signIn = new pulsar.SignInComponent($html);
    pulsar.masterSwitch = new pulsar.MasterSwitchComponent($html, pulsar.disableUi);
	pulsar.modulePermissions = new pulsar.ModulePermissionsComponent($html);
    pulsar.navMain = new pulsar.NavMainComponent($html, window);
    pulsar.filterBar = new pulsar.FilterBarComponent($html);
    pulsar.faviconEditor = new pulsar.FaviconEditor(document.head);
    pulsar.repeaterManager = new pulsar.RepeaterManagerComponent(
        pulsar.pulsarForm,
        pulsar.repeaterComponentFactory,
        $html
    );

    $(function () {
        pulsar.button.init();
        pulsar.flash.init();
        pulsar.helpText.init();
        pulsar.helpText.updateHelpSidebar();
        pulsar.pulsarForm.init();
        pulsar.pulsarSortable.init();
        pulsar.pulsarUI.init();
        pulsar.signIn.init();
        pulsar.masterSwitch.init();
        pulsar.modulePermissions.init();
        pulsar.navMain.init();
        pulsar.filterBar.init();
        pulsar.disableUi.init();
        pulsar.dropZoneComponent = pulsar.DropZoneComponentFactory.create($('body')[0], '.dropzone');
        pulsar.repeaterManager.init();

        // Switch out .svg for .png for <img> elements in older browsers
        pulsar.svgeezy.init('nocheck', 'png');

        // Use clickover enhancements for popovers
        $('[rel="clickover"]').clickover({ 'global_close': true });

        // Open navigation (should be added to NavMainComponent)
        $('.mobile-menu-button').on('click', function(e) {
            e.preventDefault();

            $('body').toggleClass('open-nav');
            $(this).toggleClass('open');

            if ($(this).text() == 'Menu') {
                $(this).text('Close');
            } else {
                $(this).text('Menu');
            }
        });

        // jsTree
        $('#container').jstree({
            'plugins' : ['state']
        });

        // DropZone
        pulsar.dropZoneComponent.init({
            supported: !lt10,
            showInputNode: lt10
        });

        // Notifications
        pulsar.faviconEditor.init();

        // NOTIFICATIONS DEBUG, PLS REMOVE, THX
        var $updateNotificationColour = $('#update-notification-colour'),
            $resetNotification = $('#notification-reset');

        if ($updateNotificationColour.length) {
            $updateNotificationColour.on('click', function (event) {
                var colour = '#' + $updateNotificationColour.closest('.input-group').find('#notification-colour').val();

                event.preventDefault();
                pulsar.faviconEditor.restore();
                pulsar.faviconEditor.addCircleNotification(colour);
            });

            $resetNotification.on('click', function (event) {
                event.preventDefault();
                pulsar.faviconEditor.restore();
            });
        }
    });

}(jQuery));
