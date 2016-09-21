/*
All this code is copyright Drakonkinst, 2016.

Hosted on Github : https://drakonkinst.github.io/helpers/
	- Github Project: https://github.com/Drakonkinst/helpers
*/


 
/* Misc Helper Functions */

function l(elementId)
{
	return document.getElementById(elementId);
}

function createElement(parentElement,elementType,elementText,elementId,elementClass,elementInnerHTML)
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
	if(elementInnerHTML)
	{
		newElement.innerHTML = elementInnerHTML;
	}
	if(!parentElement) {
		return debug("ERROR : Element creation failed [parent="+parentElement+" type="+elementType+" text="+elementText+" id="+elementId+" class="+elementClass+"]");
	}
	return parentElement.appendChild(newElement);
}



/* Initialization */

var dictionaryList = [
	["Dictionary.com", "Dictionary.com (www.dictionary.com)", "dictionary.com/browse/", false],
	["Ninjawords", "Ninjawords (www.ninjawords.com)", "ninjawords.com/", true],
	["Merraim-Webster Dictionary and Thesaurus", "Merraim-Webster Dictionary and Thesaurus (www.merraim-webster.com)", "merraim-webster.com/dictionary", false]
];

var wordListImports = [
	["vocab-word-list-1", "acetic clandestine cosmic devolve effete ensemble exhume fusillade infraction lapidary mace meretricious opulent paregoric refractory tactile tocsin tribulation"],
	["vocab-word-list-2", "animalcule collateral defray disconsolate emeritus equable foment impeach insipid larint maestro meteoric oscillate parole rheumy temporize trajectory vibrant"],
	["vocab-word-list-3", "asphyxiate cornucopia desist effeminate empathy evanescent frieze indite itinerary lien maxim motif palfrey phalanx svelte tertiary trenchant"]
];



/* Functions */

function isEnter(windowEvent, loc)
{
	if(windowEvent.keyCode === 13)
	{
		searchWords();
	}
}

function setDictResult(resultId,resultClass,resultInnerHTML,resultOnClick)
{
	resultId = resultId || "";
	resultClass = resultClass || "";
	resultInnerHTML = resultInnerHTML || "";
	l("dictionary-input__result").innerHTML = "";
	createElement(l("dictionary-input__result"),"span","",resultId,resultClass,resultInnerHTML);
	if(resultOnClick)
	{
		l(resultId).onclick = function()
		{
			resultOnClick();
		};
	}
}

function getDictName()
{
	var i, l, dictName;
	l = document.getElementById("dictionary-select");
	dictName = l.options[l.selectedIndex].innerHTML;
	for(i = 0; i < dictionaryList.length; i++)
	{
		if(dictName == dictionaryList[i][1])
		{
			return dictionaryList[i];
		}
	}
}

function searchWords()
{
	if(document.getElementById("dictionary-input__text-area").value)
	{
		var i, wordList, selectedDict, siteId, siteName;
		wordList = document.getElementById("dictionary-input__text-area").value.split(" ");
		selectedDict = getDictName();
		siteId = selectedDict[2];
		siteName = selectedDict[0];
		isSpecial = selectedDict[3];
		if(!isSpecial)
		{
			setDictResult("dictionary-input__link","inverted-button","Search <strong>[ "+wordList.join(", ")+" ]</strong> in the dictionary <strong>"+siteName+"</strong>",function()
			{
				for(i = 0; i < wordList.length; i++)
				{
					window.open("http://www."+siteId+wordList[i]);
				}
				l("document-input__result").innerHTML = "";
			});
		} else if(isSpecial)
		{
			setDictResult("dictionary-input__link","inverted-button","Search <strong>[ "+wordList.join(", ")+" ] </strong> in the dictionary <strong>"+siteName+"</strong>",function()
			{
				var str = "http://"+siteId+wordList[0];
				for(i = 0; i < wordList.length - 1; i++)
				{
					str += ","+wordList[i + 1];
				}
				window.open(str);
			}
			);
		} else
		{
			setDictResult("","dictionary-input__fail","Dictionary not recognized! [This error is not normal. Please contact Drakonkinst at (drakonkinstmc at gmail dot com) with a report of this bug.]");
		}
	} else
	{
		setDictResult("","dictionary-input__fail","You must enter something!");
	}
}



/* Post-Initialization */

function Launch()
{
	var wordImportList = document.getElementsByClassName("dictionary-import__import");
	for(var i = 0; i < wordImportList.length; i++)
	{
		wordImportList[i].onclick = function()
		{
			for(var i = 0; i < wordListImports.length; i++)
			{
				if(wordListImports[i][0] == this.id)
				{
					l("dictionary-input__text-area").value = wordListImports[i][1];
				}
			}
		};
	}
}
Launch();





