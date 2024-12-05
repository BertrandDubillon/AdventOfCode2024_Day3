
function test(fileInput) {
    // const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      const fileContents = event.target.result;
    //   const lines = fileContents.split('\n');  
    
    //Regex for finding mul(xxx,xxx)
    const reg = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;

    //make an array with the matches
    const found = [...fileContents.match(reg)];
    
    //Regex to get the numbers
    const reg2 = /[0-9]{1,3}/g;

    let total = 0;

    //for each element in found
    for (let index = 0; index < found.length; index++) {
        currentLine = [...found[index].match(reg2)]
        //find both numbers, multiply them and add the result to the total
        currentResult = currentLine[0]*currentLine[1];
        
        
        total += currentResult; 
    }
    console.log('Total phase 1 :' + total);
    
    
    
    }
    reader.readAsText(file); 
}

function test2(fileInput) {
    // const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      let fileContents = event.target.result;
    //   const lines = fileContents.split('\n');  
    
    //Regexes
    const regDo = /do\(\)/;
    const regDont = /don\'t\(\)/ ;

    //We start on a do() instruction, so we're looking for a don't() first
    let whichReg = 'dont';

    //Will hold the new sequence
    let newString = '';

    //Initialize the parsing of the file
    let fileRead = false;

    //Test sequence, comment fileContents upper variable first
    // let fileContents = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

    while (!fileRead) {

        //If the whichReg is looking for don't(), it means we want to process the sequence 
        //between index 0 and the next don't
    if (whichReg === 'dont'){           
            
            const found = fileContents.match(regDont);
            if (found) {
              
            newString += fileContents.slice(0, found.index);            
            fileContents = (fileContents.substring(found.index+7));            
            whichReg = 'do'  
            }
            else {                
                //if we don't find a don't(), we want to process what's left of the file
                newString += fileContents.slice(0, fileContents[fileContents.length]);
                // the file has been parsed
                fileRead = true;
            }  
    }
        //If the whichReg is looking for do(), it means we want to remove the sequence 
        //between index 0 and the next do
    if (whichReg === 'do'){
       
            const found = fileContents.match(regDo);
            if (found) {            
            fileContents = (fileContents.substring(found.index+4));
            whichReg = 'dont'
            }
            else {
                //if we don't find a do(), we want do not want to process what is left of the file
                // so we do nothing           
                
                // the file has been parsed
                fileRead = true;
            }
      
    }
    
}
// If we are out of the while loop, parse the newString like phase 1

const reg = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
const found = [...newString.match(reg)];
const reg2 = /[0-9]{1,3}/g;
let total = 0;

    for (let index = 0; index < found.length; index++) {
        currentLine = [...found[index].match(reg2)]
        
        currentResult = currentLine[0]*currentLine[1];
        
        
        total += currentResult; 
    }
    console.log('Total phase 2 :' + total);
    }
    
    reader.readAsText(file); 
}