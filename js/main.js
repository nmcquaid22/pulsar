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
    pulsar.pulsarUI = new pulsar.PulsarUIComponent($html, pulsar.history);
    pulsar.pulsarSortable = new pulsar.PulsarSortableComponent($html, window);
    pulsar.signIn = new pulsar.SignInComponent($html);
    pulsar.masterSwitch = new pulsar.MasterSwitchComponent($html, pulsar.disableUi);
	pulsar.modulePermissions = new pulsar.ModulePermissionsComponent($html);
    pulsar.navMain = new pulsar.NavMainComponent($html, window);
    pulsar.filterBar = new pulsar.FilterBarComponent($html);

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
        // $('#container').jstree({
        //     'plugins' : ['state']
        // });

        // DropZone
        pulsar.dropZoneComponent.init({
            supported: !lt10,
            showInputNode: lt10,
            customDropZoneDrop: analyzeImage
        });

        // Vision
        const $tags = $html.find('#tags');
        const $description = $html.find('textarea');

        $html.find('#vision').on('submit', event => event.preventDefault());

        $html.find('#vision-reset').on('click', () => {
             $tags.empty();
             $description.val('');
             pulsar.dropZoneComponent.reset();
        });

        function analyzeImage ({ files }) {
            const data = new FormData();

            data.append('image', files[0].raw);
            $description.attr('placeholder', 'Generating description...');
            $tags.append('<p class="muted">Generating tags...</p>');

            // initiate vision services
            pulsar.visionService.visionTagService.init($tags);
            pulsar.visionService.visionDescriptionService.init($description);

            // send vision request
            pulsar.visionService.visionRequestService.sendRequest(
                data,
                pulsar.visionService.visionRequestService.buildRequestUrl(['Tags', 'Description'])
            ).then(parsedResponse => {
                const { tags, description } = parsedResponse;

                console.log(parsedResponse);
                pulsar.visionService.visionTagService.appendTags(tags);
                pulsar.visionService.visionDescriptionService.insertDescription(description);
            }).catch(error => {
                console.log(error);
            });
        }
    });

}(jQuery));
