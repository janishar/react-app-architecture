export const setPageTitle = (title: string) => {
    if (title && document) document.title = title;
};

export const scrollPageToTop = () => {
    if (window) window.scrollTo(0, 0);
};

export const removeAppLoader = () => {
    if (document) {
        const appLoader = document.getElementById('appLoader');
        if (appLoader && appLoader.parentNode) appLoader.parentNode.removeChild(appLoader);
    }
};
