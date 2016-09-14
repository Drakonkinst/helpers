function isEnter(windowEvent, loc)
{
	if(windowEvent.keyCode === 13)
	{
		searchWords();
	}
}

function getDictName()
{
	var l = document.getElementById("dictionary-select");
	var dictName = l.options[l.selectedIndex].innerHTML;
	switch(dictName)
	{
		case 'Dictionary.com (www.dictionary.com)':
			return "dictionary.com/browse/"
		break;
		case 'Ninjawords (www.ninjawords.com)':
			return "ninjawords.com/"
		break;
		case 'Merraim-Webster Dictionary and Thesaurus (www.merraim-webster.com)':
			return "merriam-webster.com/dictionary/"
		break;
		default:
			return;
		break;
	}
}

function searchWords()
{
	if(document.getElementById("dictionary-input").value)
	{
		var i;
		var wordList = document.getElementById("dictionary-input").value.split(" ");
		var site = getDictName();
		if(site != "ninjawords.com/")
		{
			for(i = 0; i < wordList.length; i++)
			{
				window.open("http://www."+site+wordList[i]);
			}
		} else
		{
			var str = "http://"+site+wordList[0];
			for(i = 0; i < wordList.length - 1; i++)
			{
				str += ","+wordList[i + 1];
			}
			window.open(str);
		}
	} else
	{
		//error: nothing written
	}
}
