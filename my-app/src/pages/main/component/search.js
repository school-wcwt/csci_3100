import { useState, useEffect } from 'react';
import { darken, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import history from '../../history'


const entityFn = require("../../../component/load_backend/entityFunction");

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    flexGrow: 3,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: darken(theme.palette.background.default, 0.05),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
      width: '40%',
    },
  },
  searchIcon: {
    color: theme.palette.primary.main,
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  optionList: {
    display: 'flex',
    width: '100%'
  },
  optionName: {
    color: theme.palette.primary.main,
    fontWeight: '700',
    flex: 4
  },
  optionTag: {
    color: theme.palette.grey[400],
    flex: 1,
    textAlign: 'right',
  }
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (!open) setOptions([]) }, [open]);

  const chooseEntity = (e, chosen) => {
    if (chosen !== null) {
      setTimeout(() => {history.push(`/profile/${chosen.entityID}`)}, 500)
    }
  }

  const fetchDatabase = (e, input) => {
    setLoading(true);
    var filter = {
      $or: [
        { "entityID": { $regex: '^' + input } },
        { "username": { $regex: '^' + input } }
      ]
    };
    entityFn.entity_post(filter)
    .then(entities => {
      setOptions(entities);
      setLoading(false);
    })
    .catch(err => console.log(err))
  }

  const renderList = (option) => {
    return (
      <>
        <div className={classes.optionName}>{option.username}</div>
        <div className={classes.optionTag}>{`#${option.tag}`}</div> 
      </>
    )
  }

  const renderInputBox = (params) => (
    <InputBase 
      fullWidth placeholder="Search…"
      ref={params.InputProps.ref} inputProps={params.inputProps}
      classes={{ root: classes.inputRoot, input: classes.inputInput, }}
    />
  )

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Autocomplete
        id="custom-input-demo"
        style = {{color:"black"}}
        classes={{paper: classes.paper}}
        options={options} loading={loading}
        open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}
        onChange={chooseEntity}
        onInputChange={fetchDatabase}
        getOptionSelected={(opt, val) => {
          return opt.entityID == val.entityID
        }}
        getOptionLabel={x => x.entityID} renderOption={renderList}
        renderInput={renderInputBox}
      />
    </div>
  )
} 

export default SearchBar;