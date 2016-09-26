/*
All this code is copyright Drakonkinst, 2016.

Hosted on Github : https://drakonkinst.github.io/helpers/
	- Github Project: https://github.com/Drakonkinst/helpers
*/


 
/* Misc Helper Functions */

function l(el)
{
	return document.getElementById(el);
}

function createElement(parentEl, elType, elText, elId, elClass, elInnerHTML)
{
	var newEl, newElText;
	newEl = document.createElement(elType);
	
	if(elText)
	{
		newElText = document.createTextNode(elText);
		newEl.appendChild(newElText);
	}
	if(elId)
	{
		newEl.id = elId;
	}
	if(elClass)
	{
		newEl.className = elClass;
	}
	if(elInnerHTML)
	{
		newEl.innerHTML = elInnerHTML;
	}
	if(!parentEl) {
		return;
	}
	return parentEl.appendChild(newEl);
}



/* Initialization */

var dictionaryList = [
	["Dictionary.com", "Dictionary.com (www.dictionary.com)", "dictionary.com/browse/", false],
	["Ninjawords", "Ninjawords (www.ninjawords.com)", "ninjawords.com/", true],
	["Merriam-Webster Dictionary and Thesaurus", "Merriam-Webster Dictionary and Thesaurus (www.merriam-webster.com)", "merriam-webster.com/dictionary/", false]
];

var wordListImports = [
	["vocab-word-list-1", "acetic clandestine cosmic devolve effete ensemble exhume fusillade infraction lapidary mace meretricious opulent paregoric refractory tactile tocsin tribulation"],
	["vocab-word-list-2", "animalcule collateral defray disconsolate emeritus equable foment impeach insipid larint maestro meteoric oscillate parole rheumy temporize trajectory vibrant"],
	["vocab-word-list-3", "asphyxiate cornucopia desist effeminate empathy evanescent frieze indite itinerary lien maxim motif palfrey phalanx svelte tertiary trenchant"],
	["because-im-bored-1", "a b c d e f g h i j k l m n o p q r s t u v w x y z"] //Fight me
];



/* Functions */

function isEnter(windowEvent, loc)
{
	if(windowEvent.keyCode === 13)
	{
		switch(loc)
		{
			case 'dictionary':
				searchWords();
			break;
			//More to be added
		}
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
	var i, el, dictName;
	el = document.getElementById("dictionary-select");
	dictName = el.options[el.selectedIndex].innerHTML;
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
		var i, wordList, selectedDict, siteId, siteName, isSpecial;
		wordList = document.getElementById("dictionary-input__text-area").value.split(" ");
		selectedDict = getDictName();
		siteId = selectedDict[2];
		siteName = selectedDict[0];
		isSpecial = selectedDict[3];
		if(!isSpecial)
		{
			setDictResult("dictionary-input__link","button inverted-button","Search <strong>[ "+wordList.join(", ")+" ]</strong> in the dictionary <strong>"+siteName+"</strong>",function()
			{
				for(i = 0; i < wordList.length; i++)
				{
					window.open("http://www."+siteId+wordList[i]);
				}
				l("document-input__result").innerHTML = "";
			});
		} else if(isSpecial)
		{
			setDictResult("dictionary-input__link","button inverted-button","Search <strong>[ "+wordList.join(", ")+" ] </strong> in the dictionary <strong>"+siteName+"</strong>",function()
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





