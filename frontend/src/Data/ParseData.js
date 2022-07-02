

export const ConvertToCorrectKeys = (projects, BASE_URL) => {

    let final = [];

    projects.forEach(project => {
        final.push({id: project.id, img: BASE_URL + project.thumbnail, name: project.title, smallDescription: project.short_description });
    })

    return final;
}


export const ConvertToImgObj = (path) => {

}