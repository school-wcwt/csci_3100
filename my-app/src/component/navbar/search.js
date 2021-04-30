import { useState, useEffect } from 'react';
import { darken, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button, IconButton, InputBase } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axiosConfig'

const entityFn = require("component/load_backend/entityFunction");

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
  tagButton: { 
    fontWeight: "700",
    marginRight: theme.spacing(1),
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
  optionTagName: {
    color: theme.palette.grey[700],
    fontSize: '0,8em',
    flex: 2,
    textAlign: 'right',
  },
  optionTag: {
    color: theme.palette.grey[400],
    fontSize: '0.8em',
    flex: 2,
    textAlign: 'right',
  }
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [byTag, setByTag] = useState(false);

  useEffect(() => { 
    if (!open) setOptions([]) 
    return () => setOptions([])
  }, [open]);

  const handleMode = () => {
    setOpen(false); 
    setByTag(!byTag);
  }

  const chooseEntity = (e, chosen) => {
    if (chosen !== null) {
      setTimeout(() => {
        props.handleHistory(`/profile/${byTag ? chosen.target.entityID : chosen.entityID}`)
      }, 500)
    }
  }

  const fetchTagDB = (e, input) => {
    if (input == '') return setOptions([]);
    setLoading(true);
    axios.post('/hashtag', {filter: {name: {$regex: '^'+input, $options: 'i'}}})
    .then(res => {
      setOptions(res.data)
      setLoading(false)
    })
    .catch(err => console.log(err))
  }

  const fetchDatabase = (e, input) => {
    if (input == '') return setOptions([]);
    setLoading(true);
    var filter = {
      $or: [
        { "entityID": { $regex: '^' + input, $options: 'i' } },
        { "username": { $regex: '^' + input, $options: 'i' } }
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
        <div className={classes.optionName}>{byTag ? `${option.target.username} #${option.target.tag}` : option.username}</div>
        <div className={classes.optionTag}>{byTag ? `${option.name} - ${option.frequency}` : `#${option.tag}`}</div>
      </>
    )
  }

  const renderInputBox = (params) => (
    <InputBase 
      fullWidth placeholder={byTag ? "Searching by tags..." : "Searching entities..."}
      ref={params.InputProps.ref} inputProps={params.inputProps}
      classes={{ root: classes.inputRoot, input: classes.inputInput, }}
    />
  )

  return (
    <>
    {byTag
      ? <IconButton className={classes.tagButton} onClick={handleMode}><SearchIcon/></IconButton>
      : <Button className={classes.tagButton} onClick={handleMode}> <SearchIcon/> tag</Button>}
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
        onInputChange={byTag ? fetchTagDB : fetchDatabase}
        getOptionSelected={(opt, val) => {
          return opt.entityID == val.entityID
        }}
        getOptionLabel={byTag ? x => x.name : x => x.entityID} renderOption={renderList}
        renderInput={renderInputBox}
      />
    </div>
    </>
  )
} 

export default SearchBar;