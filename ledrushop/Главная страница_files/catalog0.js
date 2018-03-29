// 2008-2009 Copyright Transistor.ru, Ltd.

var len_color_qty = 1;
var len_leds_number = 1;
var len_color = 4;


function get_filter_value()
{
	var form = document.forms['form_filter'];
	var filter = form.var_filter.value.split(';');
	return filter[0];
}

function filter_check_param(box_name, start, len)
{
	var box = get_by_id(box_name);
	if (!box) return;

	var value = get_filter_value();
	var x = value.substr(start, len);
	if (x.match(/[^0]/)) box.style.backgroundImage = '';
	else box.style.backgroundImage = 'url(/img/style/bg_err_param.gif)';
}

function filter_check_param_x(box_name)
{
	var box = get_by_id(box_name);
	if (!box) return;

	var value = get_filter_value();
	if (value.match(/[\d]/)) box.style.backgroundImage = '';
	else box.style.backgroundImage = 'url(/img/style/bg_err_param.gif)';
}

function set_color(bit, value)
{
	set_filter(len_color_qty + (bit >> 2), bit, value);
	start = get_filter_value().length - (len_color + len_color_qty);
	filter_check_param('box_colors', start, len_color);
}

function set_color_qty(bit, value)
{
	set_filter(0, bit, value);
	start = get_filter_value().length - len_color_qty;
	filter_check_param('box_qty', start, len_color_qty);
}

function set_leds_number(bit, value)
{
	set_filter(0, bit, value);
	start = get_filter_value().length - len_leds_number;
	filter_check_param('box_leds_number', start, len_leds_number);
}

function set_case(bit, value)
{
	set_filter((len_color + len_color_qty) + (bit >> 2), bit, value);
	filter_check_param('box_cases', 0, get_filter_value().length - (len_color + len_color_qty));
}

function set_socle(bit, value)
{
	set_filter((len_color + len_leds_number) + (bit >> 2), bit, value);
	filter_check_param('box_socle', 0, get_filter_value().length - (len_color + len_leds_number));
}

function set_volt(bit, value)
{
	set_filter((len_color + len_color_qty) + (bit >> 2), bit, value);
	filter_check_param('box_volts', 0, get_filter_value().length - (len_color + len_color_qty));
}

function set_txt_input_filter(value, type, pos)
{
	if(value == '') value = 'x';
	else value = get_number(value);
	
	var form = document.forms['form_filter'];
	var filter = form.var_filter.value.split(';');
	var buff_arr = new Array();
	
	for(k = 0; k < filter.length && filter[k] != ''; k++ )
	{
		if(filter[k].search(':') == -1) continue;
		buff = filter[k].substring (3, filter[k].length);
		buff_arr = buff.split('-');
		
		if(buff_arr.length > 2)
		{
			for(j = 2; j < buff_arr.length; j++)
			{
				buff_arr.pop();
			}
			filter[k] = filter[k].substring (0, 2) + ':';
			for(var i = 0; i < buff_arr.length; i++)
			{
				filter[k] += buff_arr[i];
				if(buff_arr[i+1]) filter[k] += '-';
			}
		}
		
		if(buff_arr.length < 2)
		{
			buff_arr = [];
			for(j = 0; j < 2; j++)
			{
				buff_arr.push('x');
			}
			filter[k] = filter[k].substring (0, 2) + ':';			
			for(var i = 0; i < buff_arr.length; i++)
			{
				filter[k] += buff_arr[i];
				if(buff_arr[i+1]) filter[k] += '-';
			}
			
		}

		if(filter[k].substring (0, 2) == type)
		{	

			buff_arr[pos] = value;

			filter[k] = type + ':';			
			for(var i = 0; i < buff_arr.length; i++)
			{
				filter[k] += buff_arr[i];
				if(buff_arr[i+1]) filter[k] += '-';
			}
		}
	}
	
	form.var_filter.value = filter.join(';');
	form.action = form.var_action.value + form.var_filter.value + '/';
	switch(type)
	{
		case 'wo':
		case 'dc':
		case 'if':
			filter_check_param_x('box_supply');
			break;
		default: break;		
	}	
}

function set_supply_all(checked, type)
{
	var form = document.forms['form_filter'];

	if(checked == true)
	{
		set_txt_input_filter('x', type, 0);
		set_txt_input_filter('x', type, 1);
		
		form[type+'_min'].disabled = true;
		get_by_id(type+'_min').style.backgroundColor = "#cccccc";
		form[type+'_max'].disabled = true;
		get_by_id(type+'_max').style.backgroundColor = "#cccccc";
		
		if(type == 'wo') set_txt_input_filter(type, 'ch', 0);
		if(type == 'dc') set_txt_input_filter(type, 'ch', 1);
		if(type == 'if') set_txt_input_filter(type, 'ch', 2);
	}
	else
	{
		form[type+'_min'].disabled = false;
		get_by_id(type+'_min').style.backgroundColor = "#d5deeb";
		form[type+'_max'].disabled = false;
		get_by_id(type+'_max').style.backgroundColor = "#d5deeb";
	
		if(type == 'wo') set_txt_input_filter('x', 'ch', 0);
		if(type == 'dc') set_txt_input_filter('x', 'ch', 1);
		if(type == 'if') set_txt_input_filter('x', 'ch', 2);
	}
}

function set_filter(rank, bit, value)
{
	var form = document.forms['form_filter'];
	var filter = form.var_filter.value.split(';')
	filter[0] = set_bit_by_rank(filter[0], rank, bit & 0x03, value);
	form.var_filter.value = filter.join(';');
	form.action = form.var_action.value + form.var_filter.value + '/';
}

function set_color_all(mark)
{
	var id = 'check_color';
	set_checks_all(id, mark);
	var form = document.forms['form_filter'];
	for (i = 0; i < form.elements.length; i++)
	{
		var item = form.elements[i];
		if (item.id == id) set_color(item.value, mark);
	}
}

function set_cases_all(mark)
{
	var id = 'check_case';
	set_checks_all(id, mark);
	var form = document.forms['form_filter'];
	for (i = 0; i < form.elements.length; i++)
	{
		var item = form.elements[i];
		if (item.id == id) set_case(item.value, mark);
	}
}

function set_leds_number_all(mark)
{
	var id = 'check_leds_number';
	set_checks_all(id, mark);
	var form = document.forms['form_filter'];
	for (i = 0; i < form.elements.length; i++)
	{
		var item = form.elements[i];
		if (item.id == id) set_leds_number(item.value, mark);
	}
}

function set_socle_all(mark)
{
	var id = 'check_socle';
	set_checks_all(id, mark);
	var form = document.forms['form_filter'];
	for (i = 0; i < form.elements.length; i++)
	{
		var item = form.elements[i];
		if (item.id == id) set_socle(item.value, mark);
	}
}

function set_volt_all(mark)
{
	var id = 'check_volt';
	set_checks_all(id, mark);
	var form = document.forms['form_filter'];
	for (i = 0; i < form.elements.length; i++)
	{
		var item = form.elements[i];
		if (item.id == id) set_volt(item.value, mark);
	}
}

function convert()
{
	var f = get_number(get_by_id('f').value);
	var coner = get_number(get_by_id('coner').value);
	
	var rad = parseFloat(coner)*Math.PI/180;
	var srad = 2*Math.PI*(1 - Math.cos(rad/2));
	if(srad == 0) get_by_id('i').value = '';
	else get_by_id('i').value = Math.round(f/srad);	
}