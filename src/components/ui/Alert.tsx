import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../state/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={9} ref={ref} variant="filled" {...props} />
})

export default function CustomizedSnackbars() {
    const error = useSelector<AppStateType, string | null>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
    }

    return (
        <Snackbar open={!!error}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    )
}