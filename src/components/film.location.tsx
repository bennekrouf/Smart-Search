import { useCallback }    from 'react';

import Card             from '@mui/material/Card';
import CardActions      from '@mui/material/CardActions';
import CardContent      from '@mui/material/CardContent';
import Button           from '@mui/material/Button';
import Typography       from '@mui/material/Typography';
import Box              from '@mui/material/Box';
import { BsFillGeoAltFill, BsCameraReels }         from "react-icons/bs";

import FilmLocation     from '../models/film.location';

const FilmLocationRow  = (filmLocation:FilmLocation) => {
    const openMaps = useCallback((filmLocation:FilmLocation) => () => {
        window.open(`https://maps.google.com?q=${filmLocation.geo_point_2d['lat']},${filmLocation.geo_point_2d['lon']}`);
    }, []);

    const capitalizeFirstLetter = (s:string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
    const cardStyle = {
        height: "260px",
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-between"
    };

    return (
        <Card style={cardStyle} variant="elevation" sx={{ minWidth: 275 }}>
            <CardContent >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    { filmLocation.annee_tournage }
                </Typography>
                <Typography variant="h5" component="div">
                    { capitalizeFirstLetter(filmLocation.nom_tournage) }
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <BsCameraReels /> { capitalizeFirstLetter(filmLocation.nom_realisateur) }
                </Typography>
                <Typography variant="body2">
                    { filmLocation.type_tournage }
                    <br />
                </Typography>
            </CardContent>

            <CardActions>
                <Box
                    component="span"
                    m={1}
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start">
                    <Button sx={{ height: 20, padding: 0 }} onClick={openMaps(filmLocation)}><BsFillGeoAltFill /></Button>
                    <Typography sx={{ m: 0.5 }} color="text.secondary">
                        { filmLocation.adresse_lieu.toLowerCase() }
                    </Typography>
                </Box>
            </CardActions>

        </Card>
    )
}

export default FilmLocationRow;