import { useEffect, useState } from 'react';
import { Option } from './types';

/**
 * Use this hook to obtain a mechanism to deal with searching through and limiting the list of options.
 *
 * @param filterOptions Function which will filter the existing options; Filters based on the current search term.
 * @param allOptions List of all options available to the `Select`
 */
export default <T extends Option>(
    allOptions: T[],
    filterOptions: (options: T[], term: string) => T[] = (options) => options,
) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([...allOptions]);

    const clearSearch = () => {
        setSearchTerm('');
        setOptions([...allOptions]);
    };

    const searchFor = (term: string) => {
        setSearchTerm(term);
        setOptions(filterOptions(allOptions, term));
    };

    useEffect(() => {
        setOptions([...allOptions]);
    }, [allOptions]);

    return {
        clearSearch,
        options,
        searchFor,
        searchTerm,
    };
};
