import { withStyles } from '@material-ui/core/styles';
import {
    Dialog,
    DialogContent,
} from "@material-ui/core";

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


export const CardDetails = ({ isDialogOpened, handleCloseDialog, card }) => {
    const handleClose = () => {
        handleCloseDialog(false);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isDialogOpened}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {card.length != 0 ? card['data'][0]['name'] : 'NA'}
                <hr />
            </DialogTitle>
            <DialogContent style={{ minHeight: '500px', minWidth: '250px' }} divider>
                {card.length != 0 ? <img src={card['data'][0]['card_images'][0]['image_url']} /> : <h3><center>Loading...</center></h3>}
            </DialogContent>
        </Dialog >
    );
}
