/*
	Copyright 2003-2009 LigoMaster
*/
function get_by_id(id) // поиск обекта 
{
	if(document.all) return(document.all.item(id));
	if(document.getElementById) return(document.getElementById(id));
	return(false);
}

function getXY(obj) 
{
	var o = obj;
	var coords = {left: 0, top: 0}
	while (o && o.tagName != "BODY")
	{
		coords.left += o.offsetLeft;
		coords.top += o.offsetTop;
		o = o.offsetParent;
	}
	return coords;
}

function getXY_by_parentObject(o, parentObject_id)
{
  var c = {left:o.offsetLeft, top:o.offsetTop}, p = o.offsetParent;
  while (p && p.id != parentObject_id)
  {
    c.left += p.offsetLeft;
    c.top += p.offsetTop;
    p = p.offsetParent;
  }
  return c;
}

/* KSS: Get next or previous sibling node element */
function get_nextSibling(obj)
{
	var x = obj.nextSibling;
	while (x != null && x.nodeType != 1)
	{
		x = x.nextSibling;
	}
	return x;
}

function get_previousSibling(obj)
{
	var x = obj.previousSibling;
	while (x != null && x.nodeType != 1)
	{
		x = x.previousSibling;
	}
	return x;
}

///////////////////////////////////////////////////////////////////////////
// add/delete events
function addEventHandler(obj, name, func)
{
	if ( document.addEventListener ) obj.addEventListener( name, func, false );
	else if ( document.attachEvent ) obj.attachEvent( 'on' + name, func );
	else throw 'Error';
}

function removeEventHandler(obj, name, func)
{
	if( document.removeEventListener ) obj.removeEventListener( name, func, false );
	else if ( document.detachEvent ) obj.detachEvent( 'on' + name, func );
	else throw 'Error';
}

function cancelEvent( event, allowDefault )
{
	event.cancelBubble=true;
	if (!allowDefault) event.returnValue = false;
	if (event.stopPropagation) event.stopPropagation();
	if (!allowDefault && event.preventDefault) event.preventDefault();
}

//
function put_m_text(a1, a2, txt)
{
	var m = a1+String.fromCharCode(60+4)+a2;
	if (txt == null) txt = ml
	document.write('<a href="ma'+'ilto:'+m+'">'+txt+'</a>');
}

function get_number(value)
{
	var x = ''+value;
	x = x.replace(',', '.');
	while(x.indexOf(' ') >= 0) { x = x.replace(' ', ''); }
	x = parseFloat(x);
	return isNaN(x) ? 0 : x;
}

function limited_text_check_len(id, init)
{
	var txt = get_by_id(id);
	var cnt = get_by_id(id+'_backcounter');
	var	len = get_by_id(id+'_maxlen');
	if (!txt || !cnt || !len) return;
	var maxlen = get_number(len.value);
	if (txt.value.length > maxlen)
	{
		txt.value = txt.value.substring(0, maxlen);
		if (init == null) txt.focus();
	}
	cnt.value = maxlen - txt.value.length;
}

function set_checks_all(check_id, mark)
{
	var form = document.forms['form_filter'];
	for (i = 0; i < form.elements.length; i++)
	{
		var item = form.elements[i];
		if (item.id == check_id) item.checked = mark;
	}
}

function set_bit_by_rank(variable, rank, bit, value)
{
	variable = ''+variable;
	var pose = variable.length - rank;
	var hexChars = "0123456789ABCDEF";
	var x = set_bit('0x'+variable.substr(pose - 1, 1), bit, value);
	return variable.substr(0, pose - 1) + hexChars.charAt(x) + variable.substr(pose);
}

function set_bit(variable, bit, value)
{
	variable = parseInt(variable, 16);
	var mask = Math.pow(2, bit);
	if (value) return variable | mask;
	else return variable & ~mask;
}

function dec2Hex(dec)
{
//	dec = parseInt(dec, 10);
	var hexChars = "0123456789ABCDEF";
	var str = '';
	while(dec > 0)
	{
		var xl = dec & 0x0F;
		var xh = (dec & 0xF0) >> 4;
		str = hexChars.charAt(xh) + hexChars.charAt(xl) + str;
		dec = dec >> 8;
	}
	return str;
}

function tree_onclick(e)
{
	var ns6=document.getElementById&&!document.all

	if (!document.all&&!ns6) return
	var etarget=ns6?e.target:event.srcElement
	var imagetarget=etarget
	if (etarget.id=="foldheader"||ns6&&etarget.parentNode.id=="foldheader")
	{
		if (ns6&&etarget.parentNode.id=="foldheader")
		{
			nested=etarget.parentNode.nextSibling.nextSibling
			imagetarget=etarget.parentNode
		}
		else nested =ns6?etarget.nextSibling.nextSibling:document.all[etarget.sourceIndex+1]
		if (nested.style.display=="none")
		{
			nested.style.display=''
			imagetarget.style.listStyleImage="url(/img/icons/tree_minus.gif)"
		}
		else
		{
			nested.style.display="none"
			imagetarget.style.listStyleImage="url(/img/icons/tree_plus.gif)"
		}
	}
}

function submit_form(formID)
{
	document.forms[formID].submit();
}

function show_mes_focus(id, text, lost)
{
	var o = get_by_id(id);
	if (!o) return;
	if (lost)
	{
		if (!o.value) o.value = text;
	}
	else
	{
		if (o.value == text) o.value = '';
	}
}

/*
startList = function()
{
	if (document.all&&document.getElementById)
	{
		navRoot = document.getElementById("submenu_nav");
		for (i=0; i<navRoot.childNodes.length; i++)
		{
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI")
			{
				node.onmouseover = function() { this.className+=" over"; }
				node.onmouseout=function() { this.className=this.className.replace(" over", ""); }
			}
		}
	}
}

window.onload=startList;
*/