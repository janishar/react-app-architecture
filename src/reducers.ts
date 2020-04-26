import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import appReducer, { State as AppState } from '@ui/app/reducer';
import authReducer, { State as AuthState } from '@ui/auth/reducer';
import blogListReducer, { State as BlogListState } from '@ui/bloglist/reducer';
import blogReducer, { State as BlogState } from '@ui/blogpage/reducer';
import writerBlogsReducer, { State as WriterBlogsState } from '@ui/writer/myblogs/reducer';
import writingPadReducer, { State as WritingPadState } from '@ui/writer/writingpad/reducer';
import editorBlogsReducer, { State as EditorBlogState } from '@ui/editor/blogs/reducer';

export type RootState = {
  appState: AppState;
  authState: AuthState;
  blogListState: BlogListState;
  blogState: BlogState;
  writerBlogsState: WriterBlogsState;
  writingPadState: WritingPadState;
  editorBlogState: EditorBlogState;
};

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers<RootState>({
  appState: appReducer,
  authState: authReducer,
  blogListState: blogListReducer,
  blogState: blogReducer,
  writerBlogsState: writerBlogsReducer,
  writingPadState: writingPadReducer,
  editorBlogState: editorBlogsReducer,
});

export default rootReducer;
