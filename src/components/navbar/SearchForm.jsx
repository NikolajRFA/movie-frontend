import {Dropdown} from "react-bootstrap";
import DropdownCard from "../DropdownCard";
import Form from "react-bootstrap/Form";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import TitleObj from "../../data_objects/TitleObj";

export default function SearchForm() {
    const [title, setTitle] = useState(() => new TitleObj());
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

    useEffect(() => {
        axios.get(`http://localhost:5011/api/titles?page=0&pageSize=10`)
            .then(res => {
                setTitles(res.data.items);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    function handleSearchChange(event) {
        const newSearchPhrase = event.target.value;
        setSearchPhrase(newSearchPhrase);
        setShowDropdown(true);
        const getData = async () => {
            try {
                const updatedTitle = new TitleObj();
                await updatedTitle.fetchDropdownTitles(newSearchPhrase);
                setTitle(updatedTitle);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();

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
                    <Dropdown.Item href="#/action-1">
                        {searchPhrase}
                    </Dropdown.Item>
                    {titles.map(title => <DropdownCard key={title.url} title={title}/>)}
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </div>
        </Form>
    )
}