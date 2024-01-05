import search from "fast-fuzzy";

export const fuzzySearch = (searchTerm,array) =>{
    const result = search(
        searchTerm,
        array,
        {keySelector: (obj) => obj.addr1,threshold:0.98},
    );
    return result

}