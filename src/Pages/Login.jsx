// import { useState } from 'react'
// import { supabase } from '../Supabase/supabase'
// import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import './AuthPages.css'

// const ADMIN_EMAIL = "admin@bookhub.com"

// export default function Login() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     if (!email || !password) {
//       setError("Please fill in all fields")
//       return
//     }
//     setLoading(true)
//   const { data, error: loginError, user } = await supabase.auth.signInWithPassword({ email, password })

//     if (loginError) setError(loginError.message)
//     else {
//       if (email === ADMIN_EMAIL) navigate("/admin")
//       else navigate("/user")
//     }
//     setLoading(false)
//   }

//   return (
//     <>
//       <div className="auth-container">
//         <h2 className="auth-title">Login</h2>
//         <form onSubmit={handleLogin}>
//           <input 
//             className="auth-input" 
//             placeholder="Email" 
//             value={email} 
//             onChange={e => setEmail(e.target.value)} 
//             required
//           />
//           <input 
//             type="password" 
//             className="auth-input" 
//             placeholder="Password" 
//             value={password} 
//             onChange={e => setPassword(e.target.value)} 
//             required
//           />
//           {error && <p className="auth-error">{error}</p>}
//           <button 
//             className="auth-button" 
//             type="submit" 
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//       <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center", marginTop: "0.5rem" }}>
//         <Link to="/reset-password" className="auth-link">
//           Forgot Password?
//         </Link>
//       </div>
//       <Link to="/signup" className="auth-link">Sign Up</Link>
//     </>
//   )
// }


// src/pages/Login.js

import { useState } from 'react'
import { supabase } from '../Supabase/supabase'
import { useNavigate, Link } from 'react-router-dom'
import './AuthPages.css' // optional if you have custom styles

const ADMIN_EMAIL = "admin@bookhub.com"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)

    try {
const { data, error: loginError, user } = await supabase.auth.signInWithPassword({
  email: email.trim(),
  password: password.trim(),
})

      if (loginError) {
        console.error("Login error details:", loginError)
        setError(loginError.message)
      } else {
        console.log("Login success data:", data)
        const { user } = data
        if (email === ADMIN_EMAIL) {
          navigate("/admin")
        } else {
          navigate("/user")
        }
      }
    } catch (error) {
      console.error("Unexpected error during login:", error)
      setError("An unexpected error occurred. Please try again.")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="auth-container">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <button
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <div className="auth-footer">
        <Link to="/reset-password" className="auth-link">
          Forgot Password?
        </Link>
        <br />
        <Link to="/signup" className="auth-link">
          Don’t have an account? Sign up
        </Link>
      </div>
    </>
  )
}
