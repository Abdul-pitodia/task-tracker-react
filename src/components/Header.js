import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({ title, toggle, shown }) => {
    
    return (
        <header className="header">
            <h1>Task Tracker</h1>
            <Button color={shown ? 'red' : 'green'} text={shown ? 'Close' : 'Add Task'} onClick={toggle}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'Default one'
}

Header.propTypes = {
    title: PropTypes.string,
}

// CSS in JS
// const headerStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }

export default Header
