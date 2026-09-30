import { useEffect } from 'react'
import './Verify.css'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
const Verify = () => {
  const navigate = useNavigate()
  useEffect(() => { navigate('/myorders', { replace: true }) }, [navigate])
  return <Loader />
}
export default Verify