import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../state/store';
import {setError} from '../../state/app-reducer';
import {AlertTitle} from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={9} ref={ref} variant="filled" {...props} />
})

export default function CustomizedSnackbars() {
    const dispatch = useDispatch()
    const error = useSelector<AppStateType, string>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        dispatch(setError(''))
    }

    return (
        <Snackbar open={!!error}
                  autoHideDuration={5000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                <AlertTitle>Ошибка!</AlertTitle>
                {error}
            </Alert>
        </Snackbar>
    )
}