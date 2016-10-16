$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle("fast");
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('.accordion'), false);

	$(".chosen-tabs a").click(function(){
		var $this = $(this);
		$this.siblings().removeClass("selectTab");
		$this.addClass("selectTab");
		var id = $this.attr("id");
		$(".accordion").hide();
		$("#"+id+"-content").show();
	});
});