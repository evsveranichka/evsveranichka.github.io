var link_on = 'F0FAFF';

var last_ul_level_1 = '';
var last_ul_level_2 = '';

function init_ul_level(id)
{
	switch(id.length)
	{
		case 12: last_ul_level_1 = id;
		case 15: last_ul_level_2 = id;
		default: break; 
	}
}

function ulshow(id)
{
	switch(id.length)
	{
		case 12: 		
				if(last_ul_level_1 != '' && last_ul_level_1 != id)
				{
					get_by_id('a_'+last_ul_level_1).style.backgroundImage = '';
					get_by_id('a_'+last_ul_level_1).style.color = '';
					get_by_id('ul_'+last_ul_level_1).style.position = 'absolute';
					get_by_id('ul_'+last_ul_level_1).style.visibility = 'hidden';
					if(last_ul_level_2 != '')
					{
						get_by_id('a_'+last_ul_level_2).style.backgroundImage = '';
						get_by_id('a_'+last_ul_level_2).style.color = '';
						get_by_id('ul_'+last_ul_level_2).style.position = 'absolute';
						get_by_id('ul_'+last_ul_level_2).style.visibility = 'hidden';
						last_ul_level_2 = '';
					}
				}
			
				if(!get_by_id('ul_'+id) && !get_by_id('a_'+id))
				{
					alert('incorrect data1');
					return;
				}
				else 
				{
					if((get_by_id('ul_'+id).style.position == 'absolute' || get_by_id('ul_'+id).style.position == '') && (get_by_id('ul_'+id).style.visibility == 'hidden' || get_by_id('ul_'+id).style.visibility == ''))
					{
						get_by_id('a_'+id).style.backgroundImage = 'url(/images/left_menu_cur.png)';
						get_by_id('a_'+id).style.color = '#3f5098';
						get_by_id('ul_'+id).style.height = 'auto';
						get_by_id('ul_'+id).style.position = 'static';
						get_by_id('ul_'+id).style.visibility = 'visible';
						last_ul_level_1 = id;
					}
					else
					{
						get_by_id('a_'+id).style.backgroundImage = '';
						get_by_id('a_'+id).style.color = '';
						get_by_id('ul_'+id).style.position = 'absolute';
						get_by_id('ul_'+id).style.visibility = 'hidden';
						if(last_ul_level_2 != '')
						{
							get_by_id('a_'+last_ul_level_2).style.backgroundImage = '';
							get_by_id('a_'+last_ul_level_2).style.color = '';
							get_by_id('ul_'+last_ul_level_2).style.position = 'absolute';
							get_by_id('ul_'+last_ul_level_2).style.visibility = 'hidden';
							last_ul_level_2 = '';
						}
					}
				}
				break;
				
		default: alert('incorrect id3');	return;
	}
}