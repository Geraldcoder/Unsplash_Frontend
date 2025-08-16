import React, {
	useRef,
	useContext,
	useState,
	useEffect,
	createContext,
} from 'react'
import { ModalItems, FirstDivItems, SecondDivItems } from '../navBarItems'
import { saveAs } from 'file-saver'
const API_URL = 'https://api.unsplash.com/search/photos'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const ProductProvider = createContext()

const AppProvider = ({ children }) => {
	const navigate = useNavigate()
	const [modals, setModals] = useState(ModalItems)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [firstDiv, setFirstDiv] = useState(FirstDivItems)
	const [secondDiv, setSecondDiv] = useState(SecondDivItems)
	const [items, setItems] = useState([])
	const [pageCounts, setPageCounts] = useState(1)
	const [totalPages, setTotalPages] = useState([])
	const [query, setQuery] = useState('gym')
	const [loadedImages, setLoadedImages] = useState({})
	const [user, setUser] = useState(null)
	const [likedImage, setLikedImage] = useState([])
	const [canvas, setCanvas] = useState([])
	const [infoLogin, setInfoLogin] = useState({ email: '', password: '' })
	const [registerInfo, setRegisterInfo] = useState({
		name: '',
		email: '',
		password: '',
	})

	const url = 'http://localhost:300/api/v1/pictures'

	useEffect(() => {
		try {
			const fetchData = async () => {
				const res = await fetch(`${url}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				const data = await res.json()
				const { pics } = data
				setCanvas(pics)
			}
			fetchData()
		} catch (error) {
			console.log(error)
		}
	}, [url])

	const toggleLikedImage = (id) => {
		setLikedImage((prevLikedImages) => {
			if (prevLikedImages.includes(id)) {
				return prevLikedImages.filter((itemId) => itemId !== id)
			} else {
				return [...prevLikedImages, id]
			}
		})
	}

	const handleChangeLogin = (e) => {
		setInfoLogin({ ...infoLogin, [e.target.name]: e.target.value })
	}
	const handleChangeRegister = (e) => {
		setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
	}
	const urlLogin = 'http://localhost:300/api/v1/auth/login'

	const handleLogin = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(`${urlLogin}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(infoLogin),
			})

			const data = await response.json()
			const { token } = data
			localStorage.setItem('token', token)
			console.log(token)

			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	const registerUrl = 'http://localhost:300/api/v1/auth/register'

	const handleRegister = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(`${registerUrl}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(registerInfo),
			})

			const data = await response.json()
			const { token } = data

			localStorage.setItem('token', token)
			console.log(token)
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	const token = localStorage.getItem('token')
	const removeToken = () => {
		localStorage.removeItem('token')
	}
	const refNol = useRef(null)

	const handleImageLoad = (id) => {
		setLoadedImages((prev) => ({ ...prev, [id]: true }))
	}

	const likeUrl = 'http://localhost:300/api/v1/pictures'

	const likePicture = async (item) => {
		try {
			const { id, regular, alt_description } = item

			const res = await fetch(`${likeUrl}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					externalId: id,
					imageUrl: regular,
					description: alt_description || '',
				}),
			})

			const data = await res.json()
			if (!res.ok) {
				console.error('Backend error:', data)
				return
			}

			console.log('Picture saved:', data)
		} catch (error) {
			console.error('Error saving picture:', error)
		}
	}

	const disLikePicture = async (id) => {
		try {
			const res = await fetch(`http://localhost:300/api/v1/pictures/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			let data
			try {
				data = await res.json()
			} catch {
				data = null // No JSON body
			}

			if (!res.ok) {
				console.error('Backend error:', data || res.statusText)
				return
			}

			console.log('Picture Deleted:', data)
		} catch (error) {
			console.error('Error deleting picture:', error)
		}
	}

	const fetchData = async (customQuery) => {
		const searchQuery = customQuery !== undefined ? customQuery : query
		const response = await fetch(
			`${API_URL}?query=${searchQuery}&page=${pageCounts}&per_page=30&client_id=${
				import.meta.env.VITE_API_KEY
			}`
		)
		const data = await response.json()
		const { results, total_pages } = data
		// console.log(results)

		const formattedResults = results.map((item) => ({
			id: item.id,
			alt_description: item.alt_description,
			thumb: item.urls.thumb,
			regular: item.urls.regular,
			user: item.user,
			loaded: false,
		}))

		setItems(formattedResults)
		setTotalPages(total_pages)
	}

	const changeInputTo = (s) => {
		setQuery(s)
		refNol.current.value = s
		fetchData(s)
		setPageCounts(1)
		refNol.current.value = ''
	}

	useEffect(() => {
		fetchData()
	}, [pageCounts])

	const Login = () => {
		setInput(refNol.current.value)
		fetchData()
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		fetchData()
		setPageCounts(1)
	}

	const downloadImage = (blob, filename) => {
		saveAs(blob, filename)
	}

	const decodeToken = () => {
		useEffect(() => {
			if (token) {
				try {
					const decoded = jwtDecode(token)
					setUser(decoded)
					console.log(decoded)
				} catch (err) {
					console.error('Invalid token', err)
				}
			}
		}, [token])
	}

	return (
		<ProductProvider.Provider
			value={{
				modals,
				refNol,
				setIsModalOpen,
				isModalOpen,
				isMenuOpen,
				setIsMenuOpen,
				firstDiv,
				secondDiv,
				items,
				pageCounts,
				setPageCounts,
				Login,
				handleSubmit,
				changeInputTo,
				downloadImage,
				totalPages,
				handleImageLoad,
				loadedImages,
				handleChangeLogin,
				handleLogin,
				infoLogin,
				handleChangeRegister,
				handleRegister,
				registerInfo,
				navigate,
				token,
				removeToken,
				user,
				decodeToken,
				likePicture,
				likedImage,
				setLikedImage,
				canvas,
				toggleLikedImage,
				disLikePicture,
			}}>
			{children}
		</ProductProvider.Provider>
	)
}

export { AppProvider, ProductProvider }

export const useGlobalContext = () => {
	return useContext(ProductProvider)
}
