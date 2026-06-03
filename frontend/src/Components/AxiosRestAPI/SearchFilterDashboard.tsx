import axios from "axios";
import { useEffect, useState } from "react";

//Axios client
const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: { 'Content-Type': 'application/json' }
})

//example response interceptor
apiClient.interceptors.response.use(
    (response) => response, 
    (error) => {
        if(error.response?.status === 404) {
            console.log('Response not found');
        }
        return Promise.reject(error)
    }
)

//skeleton component
const UserSkeleton = () => (
    <div className="p-4 border-rounded shadow-sm animate-pulse bg-gray-100">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
)

//filtered dashboard
export function UserDashboard() {
    const[users, setUsers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try{
                const { data } = await apiClient.get('/users');
                setUsers(data);
            }finally {
                setIsLoading(false);
            }
        }
        loadData();
    },[]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return ( 
        <div className="p-6 max-w-4xl mx-auto">
            <input 
            type="text" 
            placeholder="Search users..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div className="grid gap-4 grid-cols-2">
                {isLoading ? (
                    [...Array(5).map((_, i) => <UserSkeleton key={i} />)]
                ) : (
                    filteredUsers.map(user => (
                        <div key={user.id} className="p-4 border rounded bg-white shadow-sm hover:border-blue-300 transition">
                            <h3 className="text-green-300 font-bold">{user.name}</h3>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}
