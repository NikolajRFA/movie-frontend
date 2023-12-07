import SearchResultCard from "../components/SearchResultCard";
import {useSearchParams} from "react-router-dom";

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <h1>Search '{searchParams.get('q')}'</h1>
            <div>
                <SearchResultCard test={searchParams.get('q')}/>
                <SearchResultCard test={searchParams.get('q') + '2'}/>
            </div>
        </>
    )
}