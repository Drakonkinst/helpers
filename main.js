/*
 * This stuff is really crappy right now.
 *
 * I'm working on it.
 *  - Drakonkinst
*/

/* Misc Helper Functions */
function l(elementId)
{
	return document.getElementById(elementId);
}

function createElement(parentElement,elementType,elementText,elementId,elementClass)
{
	var newElement, newElementText;
	newElement = document.createElement(elementType);
	
	if(elementText)
	{
		newElementText = document.createTextNode(elementText);
		newElement.appendChild(newElementText);
	}
	if(elementId)
	{
		newElement.id = elementId;
	}
	if(elementClass)
	{
		newElement.className = elementClass;
	}
	if(!parentElement) {
		return debug("ERROR : Element creation failed [parent="+parentElement+" type="+elementType+" text="+elementText+" id="+elementId+" class="+elementClass+"]");
	}
	return parentElement.appendChild(newElement);
}

function isEnter(windowEvent, loc)
{
	if(windowEvent.keyCode === 13)
	{
		searchWords();
	}
}

/* Functions */
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
			l("dictionary-input__result").innerHTML = "";
			createElement(l("dictionary-input__result"),"span","Click to search the words!","dictionary-input__link","");
			l("dictionary-input__link").onclick = function() {
				for(i = 0; i < wordList.length; i++)
				{
					window.open("http://www."+site+wordList[i]);
				}
				l("document-input__result").innerHTML = "";
			};
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
		l("dictionary-input__result").innerHTML = "";
		createElement(l("dictionary-input__result"),"span","You must enter something!","","");
	}
}
