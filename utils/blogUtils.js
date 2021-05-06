// function to calculate the read time for the posts
const calculateReadTimePerPost = (text)  => {
    const WORDS_PER_MINUTE = 200;
    let minutes_in_decimal  = text.length / WORDS_PER_MINUTE;

    return (minutes_in_decimal < 1) ? 1 : Math.round(minutes_in_decimal);
}


// function to proccess the tags and store it into array with corresponding badge classes ex.. [[tagName,className],[tagName2,className]...etc]
const proccessTags = (tags,customs) => {
    console.log(tags,customs);
    // if there are no tags or customs return
    if(!tags && !customs) { return; }
    
    // if there are customs, merge them with the tags array
    if( customs ) {
        if (!tags) {
            console.log(tags)
            console.log("first if");
            tags = [...customs];
        }else {
            tags = [...tags,...customs];
        }
    }
    // loop through the tags array and create new arrays [name,badgeClass] and push to the proccessed_tags
    let proccessed_tags = []
    for( var i = 0; i < tags.length; i++ ) {
        switch(tags[i].toLowerCase()) {
            case 'python':
            case 'golang':
            case 'go':
            case 'postgres':
            case 'postgressql':
                proccessed_tags.push([tags[i],'badge-info'])
                break;
            case 'javascript':
            case 'mysql':
            case 'sql':
            case 'linux':
                proccessed_tags.push([tags[i], 'badge-warning'])
                break;
            case 'node.js':
            case 'express':
            case 'express.js':
                proccessed_tags.push([tags[i], 'badge-success'])
                break;
            case 'java':
            case 'ruby':
            case 'angular':
            case 'html':
            case 'ruby on rails':
            case 'c':
            case 'oracle':
                proccessed_tags.push([tags[i], 'badge-danger'])
                break;
            case 'c#':
            case 'c++':
            case 'css':
            case 'php':
            case 'windows 10':
                proccessed_tags.push([tags[i], 'badge-primary'])
                break;
            default:
                proccessed_tags.push([tags[i], 'badge-secondary'])
                break;
        }
    }
    return proccessed_tags;
}
// export the function
module.exports = {
    calculateReadTimePerPost : calculateReadTimePerPost,
    proccessTags : proccessTags 
}