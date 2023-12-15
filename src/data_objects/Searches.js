import axios from "axios";
import Cookies from 'js-cookie';

class SearchService {
    static getRecentSearches(userId, page = 0, pageSize = 10) {
        return axios.get(`http://localhost:5011/api/users/${userId}/searches?page=${page}&pageSize=${pageSize}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        }).then(response => response.data.items.map(item => ({
            searchPhrase: item.searchPhrase,
            deleteUrl: item.deleteUrl

        })));
    }

    static deleteSearch(deleteUrl) {
        return axios.delete(deleteUrl, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        });
    }
}

export default SearchService;