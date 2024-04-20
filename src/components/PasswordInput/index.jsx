import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import PropTypes from 'prop-types'

const PasswordInput = ({ id, value, onChange, placeholder, handleBlur }) => {
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder ?? 'Password'}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {showPassword ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  )
}

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
}

PasswordInput.defaultProps = {
  id: 'password',
  value: 'password',
  onChange: () => {},
  placeholder: 'Placeholder',
  handleBlur: () => {},
}

export default PasswordInput
