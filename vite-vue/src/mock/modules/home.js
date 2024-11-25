import axios from '../axios'
export default {
    getme () {
        return axios.get(`http://127.0.0.1:8000/getme`)
    }
}
