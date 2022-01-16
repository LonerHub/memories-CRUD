import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../api';
import { useSelector } from 'react-redux';

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const post = useSelector((state) => currentId? state.posts.find(p => p._id===currentId): null)
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if(post) {
      setPostData(post);
    }
  }, [post])

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };
  
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>
          {currentId? 'Editing': 'Creating'} a Memory
        </Typography>
        <TextField 
            name='creator' 
            variant='outlined' 
            label='Creator'
            value={postData.creator}
            onChange={(e) => setPostData({ ...postData, creator: e.target.value })} 
            fullWidth
          />
          <TextField 
            name='title' 
            variant='outlined' 
            label='Title'
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })} 
            fullWidth
          />
          <TextField 
            name='message' 
            variant='outlined' 
            label='Message'
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
            fullWidth
          />
          <TextField 
            name='tags' 
            variant='outlined' 
            label='Tags'
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} 
            fullWidth
          />
          <div className={classes.fileInput}>
            <FileBase 
              type='file'
              multiple={false}
              onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
            />
          </div>
          <Button 
            style={{ marginBottom: 10 }}
            variant='contained'
            size='large' 
            color='primary' 
            type='submit' 
            fullWidth
          >
            Submit
          </Button>
          <Button 
            variant='contained'
            size='small' 
            color='secondary' 
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
      </form>
    </Paper>
  )
}

export default Form;
