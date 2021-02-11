import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleClose } from "../actions/dialogActions";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {setDialogComponent} from "../actions/dialogActions"

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    position:"relative"
  },
}))(MuiDialogContent);



export default function AppDialog ()  {
  const DialogState = useSelector(state => state.DialogReducer);
  const show = DialogState.open;
  const title = DialogState.title;
  const errorMessage = DialogState.errorMessage;
  const component = DialogState.component;
  const isTabs = DialogState.isTabs;
  const tabs = DialogState.tabs;
  const showCancel = DialogState.showCancel;
  const dispatch = useDispatch(); 


  return (
    <Dialog  id = "app_dialog" onClose={() => dispatch(handleClose())} aria-labelledby="customized-dialog-title" open={show}>
    <DialogTitle id="customized-dialog-title" onClose={() => dispatch(handleClose())}>
          {title}
        </DialogTitle>
    <DialogContent dividers>
      {isTabs&&tabs!=null&&tabs!=undefined&&tabs!={}?<div style={{marginBottom:"60px"}}>
        <button className={tabs.one.component==component?"tab_button dialog_tab_clicked":"tab_button"} id="dialog_one" onClick={()=>dispatch(setDialogComponent(tabs.one.component))}>{tabs.one.name}</button>
        <button className={tabs.two.component==component?"tab_button dialog_tab_clicked":"tab_button"} id="dialog_two" onClick={()=>dispatch(setDialogComponent(tabs.two.component))}>{tabs.two.name}</button> </div>:""
      }
      <div className="errorDialog" >{errorMessage}{errorMessage != "" ? (<div><br /></div>) : (<div></div>)}</div>{component}
    {DialogState.showFooter?
    <div id="dialog_footer">
      {showCancel?<Button className="app_button" style={{width:"40%"}} onClick={() => dispatch(handleClose())}>Cancel</Button>:null}
      <Button className="app_button" style={{width:showCancel?"40%":"80%",marginLeft:"15%",fontWeight:"600",fontColor:"#f16101"}} onClick={() => dispatch(DialogState.onSave)}>{DialogState.okButton}</Button>
    </div>:null
    }
    </DialogContent>
  </Dialog>
  );
};