jQuery inputDependsOn
======================

About
------
This plugin allows you to easily create form inputs that have dependencies on other inputs.

Example
--------

    <select id="favorite_color">
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
      <option value="other">Other...</option>
    </select>

    <input id="other_color" />

    <script type="text/javascript">
    $(document).ready(function(){
      $("#other_color").inputDependsOn("#favorite_color", {"other": "enable"});
    });
    </script>

This one-line call will do a couple of things for you:

* Automatically add attributes `class="disabled"` and `disabled="disabled"` to the dependent `#other_color` input. 
* Upon selecting "Other..." from the `#favorite_color` dropdown, `#other_color` will be enabled.
* Selecting Red, Green, or Blue will automatically re-disable the `#other_color` input.

Nesting Example
----------------

You can have inputs that are dependents of other dependents.

    <select id="#advanced_controls">
      <option value="0">No</option>
      <option value="1">Yes</option>
    </select>

    <select id="#auto_pilot">
      <option value="engage">Engage</option>
      <option value="disengage">Disengage</option>
    </select>

    <select id="#engine_power">
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="75">75</option>
      <option value="100">100</option>
    </select>

    <script type="text/javascript">
    $(document).ready(function(){
      $("#auto_pilot").inputDependsOn("#advanced_controls", {"1": "enable"});
      $("#engine_power").inputDependsOn("#auto_pilot", {"disengage": "enable"});
    });
    </script>

Just getting started...
------------------------

This is the first release of this plugin, but it's already capable of quite a bit. I plan on adding more advanced behaviors in the near future.
