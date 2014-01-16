<?php

use Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode,
    Behat\Behat\Exception\PendingException,
    Behat\MinkExtension\Context\MinkContext;

/*
 * This file is part of the Behat.
 * (c) Konstantin Kudryashov <ever.zet@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Behat test suite context.
 *
 * @author      Konstantin Kudryashov <ever.zet@gmail.com>
 */
class FeatureContext extends MinkContext
{
    /**
     * Environment variable
     *
     * @var     string
     */
    private $env;

    /**
     * Last runned command name.
     *
     * @var     string
     */
    private $command;

    /**
     * Last runned command output.
     *
     * @var     string
     */
    private $output;

    /**
     * Last runned command return code.
     *
     * @var     integer
     */
    private $return;

    /**
     * XPath for the empty row which is created on certain actions
     * @var string
     */
    private $newRowXPath = "//div[contains(concat(' ', @class, ' '), ' widget-row-new ')]";

    /**
     * XPath for the widget drag handle which a user drags from the tray to the homepage
     * @var string
     */
    private $handleXPath = "//div[contains(concat(' ', @class, ' '), ' tray__detail ')]//div[contains(concat(' ', @class, ' '), ' ui-draggable ')]";

    /**
     * Initializes context.
     *
     * @param   array   $parameters
     */
    public function __construct(array $parameters = array())
    {
    }

    /**
     * @Given /^I am on the homepages designer$/
     */
    public function openHomepageDesigner()
    {
        $this->visit('/app/homepages');
    }

    /**
     * @When /^I click on the \'([^\']*)\' button$/
     */
    public function iClickOnTheButton($arg1)
    {
        $this->jqueryWait();
        $page = $this->getSession()->getPage();
        $button = $page->findLink($arg1);

        $button->click();
    }

    /**
     * @Given /^the \'([^\']*)\' button should be toggled$/
     */
    public function assertButtonIsToggled($arg1)
    {
        $page = $this->getSession()->getPage();
        $button = $page->findLink($arg1);

        if (!$button->hasClass('active')) {
            throw new \Exception('Button is not toggled');
        }
    }

    /**
     * @Given /^the \'([^\']*)\' button should not be toggled$/
     */
    public function assertButtonNotToggled($arg1)
    {
        $page = $this->getSession()->getPage();
        $button = $page->findLink($arg1);

        if ($button->hasClass('active')) {
            throw new \Exception('Button is toggled');
        }
    }


    /**
     * @Then /^the grid should be visible$/
     */
    public function assertGridIsVisible()
    {
        $this->spin(function($context) {
            $page = $this->getSession()->getPage();
            $grid = $page->find("css", ".grid-master");

            if (!$grid->isVisible()) {
                throw new \Exception('Grid is not visible');
            }

            return true;
        });
    }

    /**
     * @Given /^the grid is hidden$/
     * @Then /^the grid should be hidden$/
     */
    public function assertGridNotVisible()
    {
        $this->spin(function($context) {
            $page = $this->getSession()->getPage();
            $grid = $page->find("css", ".grid-master");

            if ($grid->isVisible()) {
                throw new \Exception('Grid is visible');
            }

            return true;
        });
    }

    /**
     * @Then /^the tray should be visible$/
     */
    public function assertTrayIsVisible()
    {
        $this->jqueryWait();        
        $page = $this->getSession()->getPage();
        $grid = $page->find("css", ".tray");

        if (!$grid->isVisible()) {
            throw new \Exception('Tray is not visible');
        }
    }

    /**
     * @Given /^the tray is hidden$/
     * @Then /^the tray should be hidden$/
     */
    public function assertTrayNotVisible()
    {
        $this->jqueryWait();
        $page = $this->getSession()->getPage();
        $grid = $page->find("css", ".tray");

        if ($grid->isVisible()) {
            throw new \Exception('Tray is visible');
        }
    }

    /**
     * @Given /^the tray is visible$/
     */
    public function openTray() 
    {
        $this->openHomepageDesigner();
        $this->jqueryWait();
        $page = $this->getSession()->getPage();
        $link = $page->findLink('Widgets');
        $link->click();

        $this->assertTrayIsVisible();
    }

    /**
     * @Then /^I should see a list of categories$/
     */
    public function iShouldSeeAListOfCategories()
    {
        $page = $this->getSession()->getPage();
        $category_list = $page->find("css", ".tray__categories");
        $categories = $category_list->findAll('css', 'li');
        
        if (!$categories) {
            throw new \Exception('No categories found');
        }
    }

    /**
     * @Then /^(?:|I )should see the categories:$/
     */
    public function iShouldSeeAllCategories(TableNode $fields)
    {
        $page = $this->getSession()->getPage();

        foreach ($fields->getRows() as $row) {
            foreach ($row as $value) {
                $category = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' tray__categories ')]//li[contains(., '" . $value . "')]");
                if (!$category) {
                    throw new \Exception(sprintf('The category "%s" is not visible on this page, but it should be.', $value));
                }
            }
        }
    }

    /**
     * @When /^I click on the \"([^"]*)\" category$/
     */
    public function iClickOnTheCategory($arg1)
    {
        $page = $this->getSession()->getPage();
        $category = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' tray__categories ')]//li[contains(., '" . $arg1 . "')]");
        $category->click();
    }

    /**
     * @When /^I click on the "([^"]*)" widget$/
     */
    public function iClickOnTheWidget($arg1)
    {
        $page = $this->getSession()->getPage();
        $widget = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' tray__widgets ')]//li[contains(., '" . $arg1 . "')]");
        $widget->click();
    }

    /**
     * @Then /^(?:|I )should see the widgets:$/
     */
    public function iShouldSeeTheWidgets(TableNode $fields)
    {
        $page = $this->getSession()->getPage();

        foreach ($fields->getRows() as $row) {
            foreach ($row as $value) {
                $widget = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' tray__widgets ')]//li[contains(., '" . $value . "')]");
                if (!$widget) {
                    throw new \Exception(sprintf('The widget "%s" is not visible on this page, but it should be.', $value));
                }
            }
        }
    }

    /**
     * @Given /^row (\d+) contains the widgets:$/
     * @Given /^row (\d+) contains the widget:$/
     * @Then /^row (\d+) should contain the widgets:$/
     * @Then /^row (\d+) should contain the widget:$/
     */
    public function rowShouldContainTheWidgets($arg1, TableNode $fields)
    {
        $rows = $fields->getRows();

        $this->spin(function ($context) use ($arg1, $rows) {
            foreach ($rows as $row) {
                foreach ($row as $value) {
                    $widget = $this->getSession()->getPage()->find('xpath', "//div[contains(concat(' ', @class, ' '), ' widget-row ')][" . $arg1 . "]//div[@data-widget-guid='" . $value . "']");

                    if (!$widget) {
                        throw new \Exception(sprintf('The widget "%s" is not visible on this page, but it should be.', $value));
                    }
                }
            }
            return true;
        });
    }

    /**
     * @Then /^the new row should contain the widget:$/
     */
    public function newRowShouldContainTheWidget(TableNode $fields)
    {
        $guids = $fields->getRows();
        
        $page = $this->getSession()->getPage();
        $newRow = $page->find('css', '.widget-row-new');

        $this->jqueryWait();

        foreach ($guids as $guid) {
            foreach ($guid as $value) {
                $widget = $newRow->find('xpath', "//div[@data-widget-guid='" . $value . "']");

                if (!$widget) {
                    throw new \Exception(sprintf('The widget "%s" is not visible on this page, but it should be.', $value));
                }
            }
        }
    }

    /**
     * @Then /^the widget title should be "([^"]*)"$/
     */
    public function theWidgetTitleShouldBe($arg1)
    {
        $this->assertSession()->elementTextContains('css', '.widget__title', $arg1);
    }

    /**
     * @Given /^the drag handler "([^"]*)" attribute should be "([^"]*)"$/
     */
    public function theDragHandlerAttributeShouldBe($arg1, $arg2)
    {
        $page = $this->getSession()->getPage();
        $handle = $page->find('xpath', $this->handleXPath);
        
        $this->jqueryWait();

        if ($handle->getAttribute($arg1) != $arg2) {
            throw new \Exception('Attribute should be "' . $arg1 . '"');
        }   
    }

    /**
     * @Then /^a new row should be created$/
     * @Given /^a new row has been created$/
     */
    public function aNewRowShouldBeCreated()
    {
        
        $page = $this->getSession()->getPage();
        
        $this->jqueryWait();

        $lastRow = $page->find('css', '.widget-row-new');
        $widgets = $lastRow->find('css', '.homepage-widget');

        if ($widgets) {
            throw new \Exception('A new row has not been created or the row is not empty');
        }
    }

    /**
     * @When /^I drag the handle to row (\d+)$/
     */
    public function iDragTheHandleToRow($arg1)
    {
        $page = $this->getSession()->getPage();
        $session = $this->getSession()->getDriver()->getWebDriverSession();

        // wait for new row to be created
        $this->jqueryWait();

        $targetRow = "//div[contains(concat(' ', @class, ' '), ' ui-droppable ')][" . $arg1 . "]//div";
        
        $from = $session->element('xpath', $this->handleXPath);
        $to = $session->element('xpath', $targetRow);
        $session->moveto(array('element' => $from->getID())); //move to source location, using reference to source element
        $session->buttondown(""); //click mouse to start drag, defaults to left mouse button
        $session->moveto(array('element' => $to->getID())); //move to target location, using reference to target element
        $session->buttonup(""); //release mouse to complete drag and drop operation
    }

    /**
     * @When /^I drag the handle to the new row$/
     */
    public function iDragTheHandleToTheNewRow()
    {
        // wait for new row to be created
        $this->jqueryWait();

        $page = $this->getSession()->getPage();
        $session = $this->getSession()->getDriver()->getWebDriverSession();

        $from = $session->element('xpath', $this->handleXPath);
        $to = $session->element('xpath', $this->newRowXPath);
        $session->moveto(array('element' => $from->getID())); //move to source location, using reference to source element
        $session->buttondown(""); //click mouse to start drag, defaults to left mouse button
        $session->moveto(array('element' => $to->getID())); //move to target location, using reference to target element
        $session->buttonup(""); //release mouse to complete drag and drop operation
    }

    /**
     * @Given /^I have at least one row$/
     */
    public function iHaveAtLeastOneRow()
    {
        $page = $this->getSession()->getPage();
        $rows = $page->find('css', '.widget-row');

        if (!$rows) {
            throw new \Exception('Homepage has no rows');
        } 
    }

    /**
     * @Given /^I have a row with (\d+) widget(s?)$/
     */
    public function iHaveARowWithWidget($count)
    {
        $page = $this->getSession()->getPage();
        
        $this->openHomepageDesigner();
        $this->openTray();
        $this->iClickOnTheCategory('Bill Murray');
        $this->iClickOnTheWidget('Image');

        for ($i = 1; $i <= $count; $i++) {
            $this->iDragTheHandleToTheNewRow();
            $this->jqueryWait();
        }

        $this->rowXPath = $this->newRowXPath;
    }

    /**
     * @Then /^my rows should have the remove-row button$/
     */
    public function myRowsShouldHaveTheRemoveRowButton()
    {
        $page = $this->getSession()->getPage();
        $rows = $page->findAll('css', '.widget-row');

        foreach ($rows as $row) {
            $removeRowButton = $row->find('css', '.row-handler .remove-row');
            if (!$removeRowButton) {
                throw new \Exception('Row does not have remove-row button');
            }
        }
    }

    /**
     * @When /^I click the remove button on row (\d+)$/
     */
    public function iClickTheRemoveButtonOnRow($rowNo)
    {
        $page = $this->getSession()->getPage();
        $row = $page->find('xpath', "//div[contains(concat(' ', @class, ' '), ' widget-row ')][" . $rowNo . "]");

        if (!$row) {
            throw new \Exception('Row is not present, and it should be');
        }

        $removeButton = $row->find('css', '.remove-row');
        $removeButton->click();

        $this->rowNo = $rowNo;
    }

    /**
     * @When /^I click the row\'s "([^"]*)" button$/
     */
    public function iClickTheRowSButton($locator)
    {
        $page = $this->getSession()->getPage();
        $row = $page->find('xpath', $this->rowXPath);

        if (!$row) {
            throw new \Exception('Row is not present, and it should be');
        }

        $removeButton = $row->find('css', $locator);
        $removeButton->click();
    }

    /**
     * @Then /^the widgets should fill the row$/
     */
    public function theWidgetsShouldFillTheRow()
    {
        $page = $this->getSession()->getPage();
        $row = $page->find('xpath', $this->rowXPath);
        $rowHandler = $row->find('css', '.row-handler');

        if (!$row) {
            throw new \Exception('Row is not present, and it should be');
        }

        // get available width of row
        
        preg_match("/\bgrid-span-(\d+)\b/", $rowHandler->getAttribute('class'), $matches);
        $rowWidth = $matches[1];

        $widgets = $row->findAll('css', '.homepage-widget');

        if (!$widgets) {
            throw new \Exception('The row contains no widgets, it really should');
        }

        // wait for resize operation to complete
        $this->jqueryWait();

        $spanCount = 0;
        foreach ($widgets as $widget) {
            preg_match("/\bgrid-span-(\d+)\b/", $widget->getAttribute('class'), $matches);
            
            if (!$matches) {
                throw new \Exception('Could not find the widget grid width');
            }

            $spanCount += $matches[1];
        }

        if ($spanCount != $rowWidth) {
            throw new \Exception('Total widget spans do not equal the full width of the row');
        }
    }

    /**
     * @Given /^I remove widget (\d+) on row (\d+)$/
     */
    public function iRemoveWidgetOnRow($widgetNo, $rowNo)
    {
        $page = $this->getSession()->getPage();
        $this->jqueryWait();

        $this->iHoverOverWidgetOnRow($widgetNo, $rowNo);
        $this->jqueryWait();
        
        $removeButton = $page->find('xpath', "//div[@id='row-" . $rowNo . "']//div[contains(concat(' ', @class, ' '), ' homepage-widget ')][" . $widgetNo . "]//a[contains(concat(' ', @class, ' '), ' remove-widget ')]");

        $removeButton->click();
    }
    
    /**
     * @Given /^I hover over widget (\d+) on row (\d+)$/
     */
    public function iHoverOverWidgetOnRow($widgetNo, $rowNo)
    {
        $session = $this->getSession()->getDriver()->getWebDriverSession();

        $xpath = "//div[@id='row-" . $rowNo . "']//div[contains(concat(' ', @class, ' '), ' homepage-widget ')][" . $widgetNo . "]";

        $element = $session->element('xpath', $xpath);

        $session->moveto(array('element' => $element->getID()));

        $this->hoveredWidget = $xpath;
        $this->widgetNo = $widgetNo;
        $this->rowNo = $rowNo;
    }

    /**
     * @Given /^the resize handle should be visible$/
     */
    public function theResizeHandleShouldBeVisible()
    {
        $page = $this->getSession()->getPage();
        $widget = $page->find('xpath', $this->hoveredWidget);
        $resizer = $widget->find('css', '.resizer');

        if (!$resizer->isVisible()) {
            throw new \Exception('Resize handle is not visible');
        }
    }

    /**
     * @Then /^the widget should be highlighted$/
     */
    public function theWidgetOnRowShouldBeHighlighted()
    {
        if (!$this->rowNo || !$this->widgetNo) {
            throw new \Exception('Required widget or row not found');
        }

        $page = $this->getSession()->getPage();
        $widget = $page->find('xpath', "//div[@id='row-" . $this->rowNo . "']//div[contains(concat(' ', @class, ' '), ' homepage-widget ')][" . $this->widgetNo . "]");

        $overlay = $widget->find('css', '.overlay');

        if (!$overlay->isVisible()) {
            throw new \Exception('Widget overlay is not visible');
        }
    }

    /**
     * @Then /^I should see the "([^"]*)" link$/
     */
    public function iShouldSeeTheLink($arg1)
    {
        $page = $this->getSession()->getPage();
        $widget = $page->find('xpath', $this->hoveredWidget);
        $link = $widget->find('css', $arg1);

        if (!$link) {
            throw new \Exception('Link not found');
        }
    }

    /**
     * @Then /^the row should be removed$/
     */
    public function rowShouldBeRemoved()
    {
        if (!$this->rowNo) {
            throw new \Exception('Row number has not been set');
        }

        $page = $this->getSession()->getPage();
        $row = $page->find('css', '#row-' . $this->rowNo);

        if ($row) {
            throw new \Exception('Row has not been removed');
        }
    }

    /**
     * @Then /^I should see the "([^"]*)" modal$/
     */
    public function checkModalByID($arg1)
    {
        $page = $this->getSession()->getPage();
        $this->jqueryWait();
        $modal = $page->find('css', '#' + $arg1);

        if (!$modal || !$modal->isVisible()) {
            throw new \Exception('Modal "#' . $arg1 . '" not found, or is not visible');
        }
    }

    /**
     * @Then /^the row\'s "([^"]*)" button should be enabled$/
     */
    public function theRowSButtonShouldBeEnabled($locator)
    {
        $page = $this->getSession()->getPage();
        
        $row = $page->find('xpath', $this->rowXPath);
        $button = $row->find('css', $locator);

        $this->jqueryWait();

        if ($button->hasClass('disabled')) {
            throw new \Exception('The button is not active');
        }
    }

    /**
     * @Then /^the row\'s "([^"]*)" button should be disabled$/
     */
    public function theRowSButtonShouldBeDisabled($locator)
    {
        $page = $this->getSession()->getPage();

        $row = $page->find('xpath', $this->rowXPath);
        $button = $row->find('css', $locator);

        $this->jqueryWait();

        if (!$button->hasClass('disabled')) {
            throw new \Exception('The button is not disabled');
        }
    }



    protected function jqueryWait($duration = 10000)
    {
        $this->getSession()->wait($duration, '(typeof(jQuery)=="undefined" || (0 === jQuery.active && 0 === jQuery(\':animated\').length))');
    }

    public function spin ($lambda, $wait = 10)
    {
        for ($i = 0; $i < $wait; $i++)
        {
            try {
                if ($lambda($this)) {
                    return true;
                }
            } catch (Exception $e) {
                // do nothing
            }

            sleep(1);
        }

        $backtrace = debug_backtrace();

        throw new Exception(
            "Timeout thrown by " . $backtrace[1]['class'] . "::" . $backtrace[1]['function'] . "()\n" .
            $backtrace[1]['file'] . ", line " . $backtrace[1]['line']
        );
    }

    /**
     * Pauses the scenario until the user presses a key. Useful when debugging a scenario.
     *
     * @Then /^(?:|I )put a breakpoint$/
     */
    public function iPutABreakpoint()
    {
        fwrite(STDOUT, "\033[s    \033[93m[Breakpoint] Press \033[1;93m[RETURN]\033[0;93m to continue...\033[0m");
        while (fgets(STDIN, 1024) == '') {}
        fwrite(STDOUT, "\033[u");

        return;
    }

}
