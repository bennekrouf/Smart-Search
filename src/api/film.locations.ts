import FilmLocation from "../models/film.location";
import ResultSet from "../models/result.set";
import Option from "../models/option";
import criterias from "../data/criterias";

const limit = 99;
const API_URL = 'https://opendata.paris.fr/api/v2/catalog/datasets/lieux-de-tournage-a-paris/records';
// const facets = ['annee_tournage', 'type_tournage', 'ardt_lieu'].reduce((acc, facet) => acc += `&facet=${facet}`, '')
const get = async (index:number | 0, params: string | undefined) => {
    const metadata = `limit=${limit}&offset=${index}&timezone=UTC`;
    return await (await fetch(`${API_URL}?${params ? params + '&': ''}${metadata}`)).json();
}

const yearURI = (year:string) => {
    const theDate = `date'${year}/01/01'`;
    return `annee_tournage=${theDate}`;
}

// concat 2015 OR 2016 OR... compute the first one then use reduce to build 'OR year'
const anneeTournageURI = (years: string[]) => {
    let result = yearURI(years[0]);
    for(let i = 1; i < years.length; i++){
        result += `${orURI()}${yearURI(years[i])}`;
    }
    return result;
}

const otherTextURI = (texts: string[], optionTitle:string) => {
    debugger
    const criteria = criterias.filter((c:any) => c.title === optionTitle)[0].field;
    let result = `${criteria}=${texts[0]}`;
     for(let i = 1; i < texts.length; i++){
        result += `${orURI()}${criteria}=${texts[i]}`;
    }
    return result;
}

const orURI = () => ' OR '
const andURI = () => ' AND '

const query = async (offset: number, aOption: Option) => {
    let queryParams: string[] = [];
    Object.keys(aOption).forEach((optionTitle:string) => {
        if (aOption[optionTitle] && aOption[optionTitle].length) {
            if(optionTitle === 'Année') {
                queryParams.push(anneeTournageURI(aOption[optionTitle]));
            } else {
                queryParams.push(otherTextURI(aOption[optionTitle], optionTitle));
            }
        }
    });
    return get(offset,  encodeURI('where=' + queryParams.join(`${andURI()}`)));
}

const load = async (offset: number): Promise<ResultSet> => {
    return get(offset, undefined).then((res:any) => {
        const newData: FilmLocation[] = res?.records?.map((element:any) => ({ 
            ...element.record.fields
        }));
        return {
            filmLocations: [...newData],
            totalCount: res?.total_count,
            offset: offset + newData.length
        };
    })
}

export {
    load,
    query
};