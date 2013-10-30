<?php

namespace Jadu\Pulsar\Twig\Extension;

class TabsExtensionTest extends \PHPUnit_Framework_TestCase
{

    public function setUp()
    {
        $this->ext = new TabsExtension();
        $this->tabs = '
            [{
                "tab": 
                    {"id": "1", "label": "one"}
                , 
                "sub_tabs": [
                    {"id": "1_1", "label": "1.1"},
                    {"id": "1_2", "label": "1.2"},
                    {"id": "1_3", "label": "1.3"},
                    {"id": "1_4", "label": "1.4"},
                    {"id": "1_5", "label": "1.5"}
                ]
            },
            {
                "tab": 
                    {"id": "2", "label": "two"}
                ,
                "sub_tabs": [
                    {"id": "2_1", "label": "2.1"},
                    {"id": "2_2", "label": "2.2"},
                    {"id": "2_3", "label": "2.3"},
                    {"id": "2_4", "label": "2.4"},
                    {"id": "2_5", "label": "2.5"}
                ]
            },
            {
                "tab": 
                    {"id": "3", "label": "three"}
            }]
        ';
    }

    public function testGetName()
    {
        $this->assertEquals('tabs_extension', $this->ext->getName());
    }

    public function testGenerateTabsShouldFailWithInvalidJson()
    {
        $this->assertEquals(FALSE, $this->ext->getActiveParentTabID("json.derulo"));
    }

    public function testValueIsFalseIfNoIDSet()
    {
        $this->assertEquals(FALSE, $this->ext->getActiveParentTabID($this->tabs));
    }

    public function testActiveParentTabIsCorrectlySet()
    {
        $this->assertEquals('1', $this->ext->getActiveParentTabID($this->tabs, '1_3'));
        $this->assertEquals('2', $this->ext->getActiveParentTabID($this->tabs, '2_3'));
    }    

}
