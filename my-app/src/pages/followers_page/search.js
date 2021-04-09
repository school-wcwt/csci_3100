import { useState, useEffect } from 'react';
import { darken, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import history from '../history'


const entityFn = require("../../component/load_backend/entityFunction");

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
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
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (!open) setOptions([]) }, [open]);

  const chooseEntity = (e, chosen) => {
    setTimeout(() => {history.push(`/userprofile/${chosen}`)}, 500)
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
      setOptions(entities.map(entity => entity.entityID));
      setLoading(false);
    })
    .catch(err => console.log(err))
    
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Autocomplete
        id="custom-input-demo"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={chooseEntity}
        onInputChange={fetchDatabase}
        options={options}
        loading={loading}
        classes={{paper: classes.paper}}
        renderInput={(params) => (
          <InputBase
            ref={params.InputProps.ref}
            placeholder="Search…"
            fullWidth
            classes={{ root: classes.inputRoot, input: classes.inputInput, }}
            inputProps={params.inputProps}
          />
        )}
      />
    </div>
  )
} 

export default SearchBar;