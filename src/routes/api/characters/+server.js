import fs from "fs"

export let POST =async ({request})=>{
    let characters=await request.json();
    console.log("characters request :",characters)
    fs.writeFileSync("./var/characters.txt",JSON.stringify(characters));
    return new Response(characters)

}


export let GET=()=>{
let characters=read();
return new Response(JSON.stringify(characters))
}

function read() {
    if (!fs.existsSync("./var")) fs.mkdirSync("./var");
    if (!fs.existsSync("./var/characters.txt")) fs.writeFileSync("./var/characters.txt", "[]");
    
    const charactersString = fs.readFileSync("./var/characters.txt", 'utf8');
    
    if (charactersString) {
        return JSON.parse(charactersString);
    } else {
        return [];
    }
}