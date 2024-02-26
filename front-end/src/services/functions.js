export function searchName(array, name) {
    const findName = array.find((arr) => arr.name === name);
    return findName;
  }
 export  function searchId(array, name){
    const findId = array.find((arr) => arr.name === name)
    return findId.id
  }