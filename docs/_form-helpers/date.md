---
layout: page
title: Date
category: Form helpers
---

Generates a text input field which will show a date picker when focused.

## Example usage

{% code_example form_helpers/date %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="example-date" class="control__label">Date picker</label>
        <div class="controls">
            <input id="example-date" placeholder="dd/mm/yyyy" data-datepicker="true" data-format='default' type="text" class="form__control">
        </div>
    </div>
</div>

## Options applied to parent wrapper

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
class       | string | A space separated list of class names
guidance    | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help        | string | Additional guidance information to be displayed next to the input
label       | string | Text for the `<label>` companion element
required    | bool   | Visually indicates that the field must be completed
show-label  | bool | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to input

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
autofocus   | bool   | Whether the field should have input focus on page load
disabled    | bool   | Stops the element from being interactive if true
form        | string | Specific one or more forms this label belongs to
format      | string | Options for this can be `default`, `US` or `reverse`
id          | string | A unique identifier, if required
name        | string | The name of this control
placeholder | string | A short hint that describes the expected value
required    | bool   | Adds `required` and `aria-required="true"` attributes
value       | string | Specifies the value of the input
data-datepicker | bool | Initialises or not the datepicker. Accepts `true` (default) or `false`
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the input.

## US and Reverse Formats

Add the `data-format': 'US'` or `'data-format': 'reverse'` option to format the date properly.

{% code_example form_helpers/date-us %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="example-date" class="control__label">Date US format</label>
        <div class="controls">
            <input id="example-date" placeholder="mm/dd/yyyy" data-datepicker="true" data-format='US' type="text" class="form__control">
        </div>
    </div>
</div>

{% code_example form_helpers/date-reverse %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="example-date" class="control__label">Date reverse format</label>
        <div class="controls">
            <input id="example-date" placeholder="yyyy/mm/mm" data-datepicker="true" data-format='reverse' type="text" class="form__control">
        </div>
    </div>
</div>

## Disabled state

Add the `'disabled': true` option to disable the field on load. See the [disabling elements styleguide](styleguides/disabling_elements/) for more information about how to disable elements via javascript. Provide help text or information within the UI where possible to explain why elements are disabled.

{% code_example form_helpers/date-disabled %}

<div class="pulsar-example form">
    <div class="form__group">
        <label for="example-date" class="control__label">Date picker</label>
        <div class="controls">
            <input id="example-date" placeholder="dd/mm/yyyy" data-datepicker="true" disabled type="text" class="form__control">
        </div>
    </div>
</div>

## Accessibility

To maintain compliance with WCAG 2.0 AA, a form element must have a related label element, the easiest way to achieve this is to always pass an `id` attribute to form helpers. Form helpers will automatically add `aria-describedby="guid-<random-number>"` to inputs and an `id` to help blocks and errors. Additionally, `aria-invalid="true"` will be added to inputs when an error is passed.
