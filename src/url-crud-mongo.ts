import { Url } from './url';
import urls from './url-schema';

export const getUrlList = async (req: any, res: any) => {
    urls.find((err: any, result: Url[]) => {
        if (err) {
            res.send("Error!");
        } else {
            const urlList = result.sort((a, b) => b.date && a.date ? b.date.getTime() - a.date.getTime() : 0 ).map(url => url.trimmedValue);
            console.log(JSON.stringify(urlList))
            res.send(urlList);
        }
    });
};

export const createUrl = async (req: any, res: any) => {
    const url: Url = req.body;
    url.trimmedValue = getDomainName(url.value);
    if (!url.trimmedValue) {
        res.status(404).send('Please supply correct url value');
        return;
    }
    urls.find({ trimmedValue: url.trimmedValue }, function (err, data) {
        if (err) {
            console.log(err);
            res.status(404).send("Error!");
            return;
        }
        if (data.length > 0) {
            res.status(400).send('This domain is already registered in our database');
            return;
        }
        else {
            url.date = new Date();
            let urlScheme = new urls(url);
            urlScheme.save((err: any, result: any) => {
                if (err) {
                    res.status(404).send("Error!");
                } else {
                    console.log(JSON.stringify(result))
                    urls.find((err: any, result: Url[]) => {
                        if (err) {
                            res.status(404).send("Error!");
                        } else {
                            const urlList = result.sort((a, b) => b.date && a.date ? b.date.getTime() - a.date.getTime() : 0).map(url => url.trimmedValue);
                            console.log(JSON.stringify(urlList))
                            res.send(urlList);
                        }
                    });
                }
            });
        }
    })
};

export const updateUrl = async (req: any, res: any) => {
    const url: Url = req.body;
    //Update
};

export const deleteUrl = async (req: any, res: any) => {
    const urlID: number = req.body['id'];
    //delete
};

const getDomainName = (url: any) => {
    try {
        var existingUrl = new URL(url);
        console.log(existingUrl)
        return existingUrl.host;
    }
    catch (e) {
        console.log(e);
        return '';
    }
}