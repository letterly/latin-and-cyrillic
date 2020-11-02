var elements = document.getElementsByTagName('*');
const reverse = object => JSON.parse(`{${Object.entries(object).map(x => `"${x[1]}": "${x[0]}"`).join(",")}}`);
const capitalize = letter => (letter.startsWith(" ") || letter.length == 1) ? letter.toUpperCase() : letter.charAt(0).toUpperCase() + letter.charAt(1);
var serbian = {
    cyrillic: {
        "ц": "ts", 
        "џ": "dž",
        "њ": "nj",
        "љ": "lj",
        "а": "a", 
        "б": "b", 
        "в": "v", 
        "г": "g",
        "д": "d",
        "ђ": "đ",
        "е": "e", 
        "ж": "ž", 
        "з": "z",
        "и": "i", 
        "ј": "j", 
        "к": "k", 
        "л": "l", 
        "м": "m", 
        "н": "n", 
        "о": "o", 
        "п": "p", 
        "р": "r",
        "с": "s", 
        "т": "t",
        "ћ": "ć",
        "у": "u", 
        "ф": "f", 
        "х": "h",
        "ч": "č", 
        "ш": "š",
    },
};
for (let [key, value] of Object.entries(serbian.cyrillic)) {
    serbian.cyrillic[key.toUpperCase()] = capitalize(value);
}
serbian.latin = reverse(serbian.cyrillic);

document.addEventListener("keydown", function(event) {
    if(event.which === 189) trnsltrt("cyrillic");
    else if(event.which === 187) trnsltrt("latin");
});
function trnsltrt(system){
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text;
                for (let [key, value] of Object.entries(serbian[system])) {
                    var myRegExp = new RegExp(key, 'g'); 
                    replacedText = replacedText.replace(myRegExp, value);            
                }
                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}