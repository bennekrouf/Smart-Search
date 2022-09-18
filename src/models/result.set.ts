import FilmLocation from './film.location';
type ResultSet = {
    filmLocations: FilmLocation[],
    totalCount: number,
    offset: number
}

export default ResultSet;