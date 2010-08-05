/*
 * jQuery inputDependsOn plugin
 *
 * Version: 0.1.0
 * Date: Wed Aug 4 12:07:29 2010 -0600
 *
 * Copyright 2010, Paul Macek
 * http://github.com/macek/jquery-input-depends-on
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($){
  
  $.fn.inputDependsOn = function(id, values, options){
    
    var self = this;
    
    // methods
    this.disable = function(e){
      return e.addClass(options.cssClass).attr({disabled: true}).trigger("disable");
    };
    
    this.enable = function(e){
      return e.removeClass(options.cssClass).attr({disabled: null}).trigger("enable");
    };
    
    var find_matching_value = function(input){
      var ret = null;
      
      // if parent value is an array...
      if(input instanceof Array){
        $.each(input, function(k, v){
          if(v in values){
            ret = v;
          }
        });
      }
      // parent value is a non-array
      else {
        if(input in values){
          ret = input;
        }
      }
      return ret;
    };
    
    // options
    options = $.extend({}, $.fn.inputDependsOn.defaults, options || {});
    
    // find parent
    var parent = $(id);
    
    // iterate through selected children
    this.each(function(){
      
      var child = $(this);
      
      // parent binds
      parent
        
        .bind("change", function(){
          
          var v = find_matching_value(parent.val());
          
          // parent must be enabled to change children
          if(parent.is(":not(:disabled)") && v != null){
            // call private method
            // e.g., this["enable"](child)
            self[values[v]](child);
          }
          else {
            self[options.init](child);
          }
          
          // trigger change event down the dependency tree
          child.change();
        })
        
        
        .bind("disable", function(){
          // trigger disable event down the dependency tree
          self.disable(child);
        })
      ;
    });
    
    // init
    parent.change();
    
    return this;
  };
  
  $.fn.inputDependsOn.defaults = {
    init: "disable",
    cssClass: "disabled"
  };
  
})(jQuery);
