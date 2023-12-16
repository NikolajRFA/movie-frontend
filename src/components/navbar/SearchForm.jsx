import {Dropdown} from "react-bootstrap";
import DropdownCard from "../DropdownCard";
import Form from "react-bootstrap/Form";
import {useContext, useEffect, useRef, useState} from "react";
import DropdownTitles from "../../data_objects/DropdownTitles";
import LoadingSpinner from "../LoadingSpinner";
import {useNavigate} from "react-router-dom";
import RecentSearches from "../recentSearches/RecentSearches";
import {AuthContext} from "#AuthContext";

export default function SearchForm() {
    const [dropdownTitles, setDropdownTitles] = useState(() => new DropdownTitles());
    const [searchPhrase, setSearchPhrase] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext)

    useEffect(() => {
        function handleResize() {
            if (inputRef.current) {
                const inputWidth = inputRef.current.offsetWidth;
                const dropdownMenu = dropdownRef.current;
                if (dropdownMenu) {
                    // Ensure the dropdown has the same width as the search bar.
                    dropdownMenu.style.width = `${inputWidth}px`;
                   // dropdownMenu.style.maxWidth = `${inputWidth}px`;
                }
            }
        }

        handleResize(); // Initial calculation on mount

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [searchPhrase, showDropdown]);

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
        const dropdownMenu = dropdownRef.current;

        if (dropdownMenu && dropdownMenu.contains(event.relatedTarget)) {
            // If focus is moving to the dropdown or its children, don't close the dropdown immediately
            return;
        }

        setShowDropdown(false);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        navigate(`/results?q=${searchPhrase}`);
        handleSearchBlur(event);
    }

    return (
        <Form className="w-75" onSubmit={handleFormSubmit}>
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
                <Dropdown.Menu ref={dropdownRef} show={showDropdown}>
                    {searchPhrase ? (
                        !dropdownTitles.loading
                            ? dropdownTitles.data.map(title =>
                                <Dropdown.Item
                                    key={title.url}
                                    onClick={(e) => {
                                        navigate(`/titles/${title.url.split('/').pop()}`);
                                        handleSearchBlur(e);
                                    }}>
                                    <DropdownCard title={title}/>
                                </Dropdown.Item>)
                            : <Dropdown.Item><LoadingSpinner/></Dropdown.Item>
                    ) : (
                        isLoggedIn ? <RecentSearches inputRef={inputRef}/> : <Dropdown.Item>Start typing to see results!</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </div>
        </Form>
    )
}