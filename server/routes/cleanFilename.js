

const cleanFilename = originalFilename => {
  const splitName = originalFilename.split(".");

  // if there is no file extension...
  if(splitName.length === 1){
      return splitName[0];
  }

  // remove only the last element of the splitName array
  const slicedArray = splitName.slice(0, splitName.length - 1)

  // merge the array back into a string with "." joining
  const newName = slicedArray.join('.');


 return newName;
};


// console.log(cleanFilename("marcus.png"));

// console.log(cleanFilename("marcus.human.png"));

// console.log(cleanFilename("dog.bark.js"));

// console.log(cleanFilename("marcus"));

module.exports = cleanFilename