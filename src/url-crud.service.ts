import { Url, urls } from "./url";

export const getAllUrls = async (): Promise<Url[]> => {
    return urls;
};

export const createUrls = async (url: Url): Promise<void> => {
    urls.push(url);
}

export const updateUrls = async (url: Url): Promise<void> => {
    let index = urls.findIndex(d => d.id === url['id']);
    if (index > 0 || index == 0) {
        urls[index]['value'] = url['value'];
        urls[index]['trimmedValue'] = url['trimmedValue'];
        urls[index]['date'] = url['date'];

    }
}


export const deleteUrls = async (id: number): Promise<void> => {
    console.log(`in delete url index is ${JSON.stringify(id)}`)
    let index = urls.findIndex(d => d.id === id);
    console.log(`in delete url index is ${index}`)
    if (index > 0 || index == 0)
        urls.splice(index, 1);

}
