// function to calculate the read time for the posts
const calculateReadTimePerPost = (text)  => {
    const WORDS_PER_MINUTE = 200;
    let minutes = 1;
    let minutes_in_decimal  = text.length / WORDS_PER_MINUTE;

    return (minutes_in_decimal < 1) ? minutes : Math.round(minutes_in_decimal);
}


// function to proccess the tags and store it into array with corresponding badge classes ex.. [[tagName,className],[tagName2,className]...etc]
const proccessTags = (tags) => {
    let proccessed_tags = []
    for( var i = 0; i < tags.length; i++ ) {
        switch(tags[i].toLowerCase()) {
            case 'python':
                proccessed_tags.push([tags[i],'badge-info'])
                break;
            case 'javascript':
                proccessed_tags.push([tags[i], 'badge-warning'])
                break;
            case 'java':
                proccessed_tags.push([tags[i], 'badge-danger'])
                break;
            default:
                proccessed_tags.push([tags[i], 'badge-primary'])
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