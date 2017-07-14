const filterStatusReducer = (state = 'SHOW_ALL', action) => {
    if (action.type === 'FILTER_SHOW_ALL') return 'SHOW_ALL';
    if (action.type === 'FILTER_MEMMORIZED') return 'MEMORIZED';
    if (action.type === 'FILTER_NEED_PRACITICE') return 'NEED_PRACITICE';
    return state;
};
export default filterStatusReducer;
