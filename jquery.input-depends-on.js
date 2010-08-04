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
    
    // options
    options = $.extend({}, $.fn.dependsOn.defaults, options || {});
    
    // find parent
    var parent = $(id);
    
    // iterate through selected children
    this.each(function(){
      
      var child = $(this);
      
      // parent binds
      parent
        
        .bind("change", function(){
          
          var v = parent.val();
          
          // parent must be enabled to change children
          if(parent.is(":not(:disabled)") && v in values){
            
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
  
  $.fn.dependsOn.defaults = {
    init: "disable",
    cssClass: "disabled"
  };
  
})(jQuery);
