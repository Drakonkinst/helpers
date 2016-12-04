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
	var newElText,
	newEl = document.createElement(elType);
	
	if(!parentEl)
		return;
	
	if(elText)
		newEl.appendChild(document.createTextNode(elText));
	
	if(elId)
		newEl.id = elId;
	
	if(elClass)
		newEl.className = elClass;
	
	if(elInnerHTML)
		newEl.innerHTML = elInnerHTML;
	
	return parentEl.appendChild(newEl);
}



/* Initialization */
var preferences = { //developer use only, for now 
	beta: false
	//more...
}

var dictionaryList = [
	["Dictionary.com", "Dictionary.com (www.dictionary.com)", "dictionary.com/browse/", false],
	["Ninjawords", "Ninjawords (www.ninjawords.com)", "ninjawords.com/", true],
	["Merriam-Webster Dictionary and Thesaurus", "Merriam-Webster Dictionary and Thesaurus (www.merriam-webster.com)", "merriam-webster.com/dictionary/", false]
];

var wordListImports = [
	["vocab-word-list-1", "acetic clandestine cosmic devolve effete ensemble exhume fusillade infraction lapidary mace meretricious opulent paregoric refractory tactile tocsin tribulation"],
	["vocab-word-list-2", "animalcule collateral defray disconsolate emeritus equable foment impeach insipid larint maestro meteoric oscillate parole rheumy temporize trajectory vibrant"],
	["vocab-word-list-3", "asphyxiate cornucopia desist effeminate empathy evanescent frieze indite itinerary lien maxim motif palfrey phalanx svelte tertiary trenchant"],
	["vocab-word-list-4", "abortive anomalous captious coadjutor disjointed educe empirical exculpate firmament iridescent macerate mores norm optimum probity probity rostrum turpitude"],
	["vocab-word-list-5", "accolade antipathy carmine coalesce dissimulate egotism erupt felicitous inflect jurist meander nemesis novitiate outmoded protocol specious vernacular"],
	["vocab-word-list-6", "agenda apoplectic circumspect denude dote emote exacerbate fey insatiable laity mordant neuter opprobrium precipitous reinstate throes vicissitudes"],
	["vocab-word-list-7", "ambulatory circumvent cuckold didactic effrontery ethereal exigencies gargoyle hirsute incantation malfeasance naiad pontificate pyromaniac sapient technique"],
	["vocab-word-list-8", "apothecary colloquial curate dissemble epilogue eviscerate genealogy impecunious lave merino panegyric potentate recant scion temerity"],
	["vocab-word-list-9", "catholic correlate deduce durance equivocal excrescence halcyon inanimate lunar misdemeanor parson pulsate referendum roe symposium venire"],
	["vocab-word-list-10", "accouter axiom bereft cortege disdain gratuitous inveigle larva magniloquent masticate nirvana octavo peroration sacrilege suffuse unimpeachable verdant"],
	["vocab-word-list-11", "affinity bacchanalian blasphemous decennial expatiate homogeneous intercede linguist malapropism maudlin nugatory pantheon plethora smelt surrogate upbraid vocal"],
	["vocab-word-list-12", "asperity bandanna conclave depose fuselage influx laconic machiavellian marsupial melee nullify papal psychosis sterling synopsis utilize zenith"]
];




/* Internal Functions */
function refreshPrefs()
{
	var el = l("beta__container");
	
	if(!preferences.beta)
		el.style.visibility = "hidden";
	else 
		el.style.visibility = "visible";
}

/* Functions */
function isEnter(windowEvent, loc)
{
	if(windowEvent.keyCode === 13)  //ENTER
	{
		if(loc == "dictionary")
			searchWords();
		
		//more...
	}
}

function setDictResult(resultId, resultClass, resultInnerHTML, resultOnClick)
{
	resultId = resultId || "",
	resultClass = resultClass || "",
	resultInnerHTML = resultInnerHTML || "";
	
	l("dictionary-input__result").innerHTML = "";
	createElement(l("dictionary-input__result"),"span","",resultId,resultClass,resultInnerHTML);
	
	if(resultClass === "dictionary-input__fail")
		l("dictionary-input__result").style.marginTop = "-15px";
	else
		l("dictionary-input__result").style.marginTop = 0;
	
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
	var i,
	el = l("dictionary-select"),
	dictName = el.options[el.selectedIndex].innerHTML;
	
	for(i = 0; i < dictionaryList.length; i++)
	{
		if(dictName == dictionaryList[i][1])
			return dictionaryList[i];
	}
}

function searchWords()
{
	if(!(l("dictionary-input__text-area").value))
	{
		setDictResult("","dictionary-input__fail","You must enter something!");
		return;
	}
		
	var i,
	wordList = l("dictionary-input__text-area").value.split(" "),
	selectedDict = getDictName(),
	siteId = selectedDict[2],
	siteName = selectedDict[0],
	isSpecial = selectedDict[3];
	
	if(isSpecial)
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
		
	}
	else
	{
		setDictResult("dictionary-input__link","button inverted-button","Search <strong>[ "+wordList.join(", ")+" ]</strong> in the dictionary <strong>"+siteName+"</strong>",function()
		{
			for(i = 0; i < wordList.length; i++)
			{
				window.open("http://www."+siteId+wordList[i]);
			}
			l("document-input__result").innerHTML = "";
		});
	}
}

/* Post-Initialization */
function Launch()
{
	var i, j,
	wordImportList = document.getElementsByClassName("dictionary-import__import");
	
	for(i = 0; i < wordImportList.length; i++)
	{
		wordImportList[i].onclick = function()
		{
			for(j = 0; j < wordListImports.length; j++)
			{
				if(wordListImports[j][0] == this.id)
					l("dictionary-input__text-area").value = wordListImports[j][1];
			}
		};
	}
	
	window.mobilecheck = function() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};
	
	setTimeout(function()
	{
		var el = l("mobile-warning");
		if(window.mobilecheck == true)
		{
			el.style.visibility = "visible";
			el.style.display = "block";
		}
		else
		{
			el.style.visibility = "hidden";
			el.style.display = "none";
		}
	}, 100);
	
	refreshPrefs();
}
Launch();
