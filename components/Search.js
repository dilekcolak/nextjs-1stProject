"use client";
import { SearchOutlined } from '@ant-design/icons';
import { Input } from "antd";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import SuggestionsList from './SuggestionsList';

const fetchSuggestions = async (searchTerm) => {
    const res = await fetch(`/api/searchUsers?search=${searchTerm}`);
    if (!res.ok) {
        throw new Error('Error fetching suggestions');
    }
    const data = await res.json();

    const filteredData = data.filter(user => user.username.toLowerCase().startsWith(searchTerm.toLowerCase()));

    if (filteredData.length === 0) {
        return [{ id: 0, username: 'Kullanıcı Bulunamadı' }];
    }

    return filteredData;
};

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [bgColor, setBgColor] = useState('#D291E4');

    const { data: suggestions = [], refetch } = useQuery({
        queryKey: ['searchSuggestions', searchTerm],
        queryFn: () => fetchSuggestions(searchTerm),
        enabled: searchTerm.length > 0,
        refetchOnWindowFocus: false,
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value.length > 0) {
            refetch();
        }
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '450px',
                backgroundColor: bgColor,
                borderRadius: '20px',
                transition: 'background-color 0.3s ease',
                padding: '10px'
            }}
            onMouseEnter={() => setBgColor('#D1A4FC')}
            onMouseLeave={() => setBgColor('#D291E4')}
        >
            <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                    borderRadius: '20px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    paddingLeft: '10px',
                    width: '100%',
                    outline: 'none',
                    boxShadow: 'none'
                }}
            />

            {searchTerm && suggestions.length > 0 && (
                <SuggestionsList suggestions={suggestions} />
            )}
        </div>
    );
};

export default Search;
