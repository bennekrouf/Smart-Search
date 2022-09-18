import { useEffect, useState, useCallback, useRef } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LinearProgress } from "@mui/material";

import FilmLocationRow from './film.location';
import { load, query } from '../api/film.locations';
import criterias from "../data/criterias";
import ResultSet from '../models/result.set';
import Option from '../models/option';

import styles from '../app.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import QueryInput from './query.input';


const Result = () => {
    const [resultSet, setResultSet] = useState<ResultSet>();
    const [hasMoreValue, setHasMoreValue] = useState(true);

    const handleOnRowsScrollEnd = () => {
        if (resultSet && resultSet.offset < resultSet.totalCount) {
            setHasMoreValue(true);
            // loady();
        } else {
            setHasMoreValue(false);
        }
    }

    // const load = useCallback(async (currentResultSet: ResultSet | undefined): Promise<ResultSet> => {
    //     return loady().then((res:any) => {
    //         const newData: FilmLocation[] = res?.records?.map((element:any) => ({ 
    //             ...element.record.fields
    //         }));
    //         return {
    //             filmLocations: currentResultSet && currentResultSet.offset ? [...currentResultSet.filmLocations, ...newData] : [...newData],
    //             totalCount: res?.total_count,
    //             offset: currentResultSet?.offset + newData.length
    //         };
    //     })
    // }, [])
    const countLoad = useRef(0);
    useEffect(() => {
        if (countLoad.current === 0) {
            load(0).then((res:ResultSet) => {
                setResultSet(res);
                countLoad.current++;
            })
            .catch((err:any) => {
                console.log(err);
            })
        }
    }, []);

    const handleSearch = () => {
        query(0, option).then(res => {
            console.log(res.records.map((a:any) => a.record.fields['annee_tournage']));
            console.log(res.records.map((a:any) => a.record.fields['type_tournage']));
            console.log(res.records.map((a:any) => a.record.fields['ardt_lieu']));
        })
    }

    const [option, setOption] = useState<Option>({});

    const bindingHandler = (updatedOption: Option) => {
        option[Object.keys(updatedOption)[0]] = updatedOption[Object.keys(updatedOption)[0]];
        setOption(option);
    }
    
    return (
        <main className={styles.main_section}>
            <div className={styles.container}>
                <div className={styles.search_section}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 3, md: 0 }}>
                            {
                                criterias.map((e, i) => (
                                    <Grid xs={12} sm={12} md={6} lg={4} xl={3}  key={i}>
                                        <QueryInput updateOption={bindingHandler} {...e}  />
                                    </Grid>
                                ))
                            }
                            <Grid xs={12} sm={6} md={6} lg={3} xl={4}>
                                <Button onClick = { handleSearch } variant="contained" style={{minWidth: '240px', backgroundColor:'#147b7b'}}>Search</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <Box sx={{ flexGrow: 1 }}>
                { resultSet?.filmLocations?.length ? (
                    <InfiniteScroll
                    dataLength={resultSet?.filmLocations?.length | 0}
                    next={handleOnRowsScrollEnd}
                    hasMore={hasMoreValue}
                    scrollThreshold={1}
                    loader={<LinearProgress />}
                    style={{ overflow: "unset" }}>
                        <Grid container spacing={{ xs: 2, md: 5 }} >
                            { 
                                resultSet?.filmLocations.map(fl => (
                                    <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={fl.id_lieu}>
                                        <FilmLocationRow {...fl} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </InfiniteScroll>
                ) : (<LinearProgress />)
                }                    
            </Box>
            </div>
        </main>
        )
}

export default Result;