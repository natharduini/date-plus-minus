/* Plugin for date plus/minus buttons
 * © Nath Arduini
 * Requires moment.js
 */ 
(function($) {
	$.fn.datePlusMinus = function(options) {
	  if (!this.length) { return this; }
	  var opts = $.extend(true, {}, $.fn.datePlusMinus.defaults, options);

	  this.each(function() {
	    var $this = $(this);
	    var $target = $(opts.target);

	    opts.step = parseInt(opts.step);

	    var template = '<div class="date-plus-minus" data-target="{target}" data-unit="{unit}" data-step="{step}">' +
				  '<button type="button" class="date-minus btn btn-xs btn-default">-</button>'+
				  '<button type="button" class="date-plus btn btn-xs btn-default">+</button>' +
				  '<div class="date-plus-minus-step">{step} {unit_label}</div>' +
				  '</div>';

	   	var html = template.replace(/\{unit}/g, opts.unit)
	   					    .replace(/\{target}/g, opts.target)
	   					    .replace(/\{unit_label}/g, opts.unitLabel)
	   					    .replace(/\{step}/g, opts.step);
	   	$target.attr('data-target', opts.target)
	    	   .attr('data-unit', opts.unit)
	    	   .attr('data-step', opts.step);
	   	$this.addClass('date-plus-minus').append(html);

	    $this.on('click', '.date-minus', function(event) {
	    	event.preventDefault();
	    	var $input = $(opts.target);
	    	var date = moment($input.val(), opts.format);
	    	var newdate = date.subtract(opts.step, opts.unit);
	    	$input.val(newdate.format(opts.format));
	    });
	    $this.on('click', '.date-plus', function(event) {
	    	event.preventDefault();
	    	var $input = $(opts.target);
	    	var date = moment($input.val(), opts.format);
	    	var newdate = date.add(opts.step, opts.unit);
	    	$input.val(newdate.format(opts.format));
	    });
	  });

	  return this;
	};

	// default options
	$.fn.datePlusMinus.defaults = {
		format: 'DD/MM/YYYY HH:mm',
	  	target: '',
	  	unit: 'day',
	  	unitLabel: 'day',
	  	step: 1
	};
	
})(jQuery);