export const CLEAR_PAGE_TITLE = "CLEAR_PAGE_TITLE"
export const SET_PAGE_TITLE = "SET_PAGE_TITLE"
export const UPDATE_APP_USER_NAME = "UPDATE_APP_USER_NAME"

export const clearPageTitle = () => ({
	type: CLEAR_PAGE_TITLE,
})

export const setPageTitle = (title) => ({
	type: SET_PAGE_TITLE,
	data: title
})

export const updateUserName = (name) => ({
	type: UPDATE_APP_USER_NAME,
	data: name
})