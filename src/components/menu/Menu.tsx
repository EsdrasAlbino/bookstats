import { NavLink } from 'react-router-dom';
import '../../styles/Menu.css';

export const MenuBar = () => {
    return (
        <nav className="menu">
            <ul>
                <li>
                    <NavLink to="/book-list">Lista de Livros</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard">Dashboard de Gráficos</NavLink>
                </li>
            </ul>
        </nav>
    );
};

