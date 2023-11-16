import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import MediaWikiService from './media-wiki-service';
import { debounce } from '@mui/material/utils';
import { useDispatch } from 'react-redux';
import { actions } from "./actions";

interface Article {
    title: string;
}

const mediaWikiService = new MediaWikiService();



export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<Article | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<readonly Article[]>([]);
    const loading = open && options.length === 0;
    const dispatch = useDispatch();

    const fetch = React.useMemo(
        () =>
            debounce(
                (
                    request: string,
                    callback: (results?: readonly Article[]) => void,
                ) => {
                    mediaWikiService.getArticles(
                        request,
                        callback
                    );
                },
                400,
            ),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }


        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch(inputValue, (results?: readonly Article[]) => {
            if (active) {
                let newOptions: readonly Article[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                if (results?.length && results?.length > 3) {
                    console.log('ROTATING', Date.now());
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, loading, fetch, dispatch]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    React.useEffect(() => {
        if (options.length) {
            console.log('USED EFFECT', Date.now())
            dispatch(actions.rotate());
        }
    }, [options]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            onChange={(event: any, newValue: Article | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

