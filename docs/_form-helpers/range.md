---
layout: page
title: Range
category: Form helpers
---

Generates a range slider input.

## Example usage

{% code_example form_helpers/range %}

<div id="pulsar-example">
    <form class="form">
        <div class="form__group form-range">
            <label for="foo" class="control__label">
                Size
            </label>
            <div class="controls">
                <input id="foo" type="range" class="form__control">
            </div>
        </div>
    </form>
</div>

## Options applied to parent wrapper

Option       | Type   | Description
------------ | ------ | ---------------------------------------------------------
append       | string | Text or markup to include after the input element
append_type  | string | Use only when appending a button. `button` is the only valid value
class        | string | A space separated list of class names
guidance     | string | Text to be displayed in a popover, adds a (?) icon after the input
guidance-container | string | Element to bind guidance popover scroll behaviour to (default `body`)
help         | string | Additional guidance information to be displayed next to the input
label        | string | Text for the `<label>` companion element
prepend      | string | Text or markup to include before the input element
prepend_type | string | Use only when prepending a button. `button`is the only valid value
required     | bool   | Visually indicates that the field must be completed
show-label   | bool   | Control visibility of the `<label>` element without affecting layout (default: true)

## Options applied to input

Option      | Type   | Description
----------- | ------ | ---------------------------------------------------------
autofocus   | bool   | Whether the field should have input focus on page load
disabled    | bool   | Stops the element from being interactive if true
form        | string | Specific one or more forms this label belongs to
id          | string | A unique identifier, if required
name        | string | The name of this control
required    | bool   | Adds `required` and `aria-required="true"` attributes
value       | string | Specifies the value of the input
data-*      | string | Data attributes, eg: `'data-foo': 'bar'`

Any other options not listed here will be applied to the input.

## Error state

{% raw %}
```twig
{{
    form.range({
        'label': 'Example',
        'error': 'Something went wrong',
        ...
```
{% endraw %}

<div id="pulsar-example">
    <form class="form">
        <div class="form__group form-range has-error">
            <label for="foo" class="control__label">
                Example
            </label>
            <div class="controls">
                <input id="foo" type="range" class="form__control">
                <span class="help-block is-error"><i class="icon-warning-sign"></i> Something went wrong</span>
            </div>
        </div>
    </form>
</div>

## Widths

The main input can use 1-9 columns of the 12 column grid (where 3 are used for the main label), the width can be modified by passing the required column class via the `class` attribute.

* `.form__content--col-1`
* `.form__content--col-2`
* `.form__content--col-3`
* `.form__content--col-4` (default)
* `.form__content--col-5`
* `.form__content--col-6`
* `.form__content--col-7`
* `.form__content--col-8`
* `.form__content--col-9`