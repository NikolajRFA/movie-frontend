import {Dropdown} from "react-bootstrap";
import DropdownCard from "../DropdownCard";
import Form from "react-bootstrap/Form";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import TitleObj from "../../data_objects/TitleObj";
import DropdownTitles from "../../data_objects/DropdownTitles";
import dropdown from "bootstrap/js/src/dropdown";
import LoadingSpinner from "../LoadingSpinner";

export default function SearchForm() {
    const [dropdownTitles, setDropdownTitles] = useState(() => new DropdownTitles());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        function handleResize() {
            if (inputRef.current) {
                const inputWidth = inputRef.current.offsetWidth;
                const dropdownMenu = document.getElementById('searchDropdownMenu');
                if (dropdownMenu) {
                    // Ensure the dropdown has the same width as the search bar.
                    dropdownMenu.style.minWidth = `${inputWidth}px`;
                    dropdownMenu.style.maxWidth = `${inputWidth}px`;
                }
            }
        }

        handleResize(); // Initial calculation on mount

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [searchPhrase, showDropdown]);

    // TODO: set loading spinner on new search.
    function handleSearchChange(event) {
        const newSearchPhrase = event.target.value;
        setSearchPhrase(newSearchPhrase);
        setShowDropdown(true);
        const getData = async () => {
            try {
                DropdownTitles.fetchDropdown(newSearchPhrase)
                    .then(res => setDropdownTitles(res));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        if (newSearchPhrase) getData();
    }


    function handleSearchFocus() {
        setShowDropdown(true);
    }

    function handleSearchBlur(event) {
        const dropdownMenu = document.getElementById('searchDropdownMenu');

        if (dropdownMenu && dropdownMenu.contains(event.relatedTarget)) {
            // If focus is moving to the dropdown or its children, don't close the dropdown immediately
            return;
        }

        setShowDropdown(false);
    }

    return (
        <Form className="w-75">
            <Form.Control
                type="text"
                placeholder="Search"
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                ref={inputRef}
            />

            <div style={{
                marginTop: '-12px',
                position: 'absolute',
                top: 'calc(100% + 10px)',
                zIndex: 1000,
            }}
                 onBlur={handleSearchBlur}>
                <Dropdown.Menu id="searchDropdownMenu" show={showDropdown}>
                    <Dropdown.Item>
                        {searchPhrase && (!dropdownTitles.loading
                        ? dropdownTitles.data.map(title => <DropdownCard key={title.url} title={title}/>)
                    : <LoadingSpinner/>)}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </div>
        </Form>
    )
}